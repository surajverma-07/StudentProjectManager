import React,{useCallback, useEffect} from "react";
import {useForm } from "react-hook-form";
import {Button ,Select , Input,RTE} from '..'
import appwriteService from '../../Appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){

    const {register,handleSubmit,watch,setValue,control,getValues } = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status:post?.status || 'active',
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) =>{
        // if post available means - Updation
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) :null;
            const file1 = data.synopsis[0] ? await appwriteService.uploadFile(data.synopsis[0]) :null;
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            if(file1){
                appwriteService.deleteFile(post.synopsis)
            }
            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file? file.$id:undefined ,
                synopsis:file?file.$id:undefined,
            })
            if(dbPost){
              navigate(`/post/${dbPost.$id}`)      
            }
        }
        // add new post 
        else{
          const file = await appwriteService.uploadFile(data.image[0]);
          const file1 = await appwriteService.uploadFile(data.synopsis[0]);

          if(file){
            const fileId = file.$id
            data.featuredImage = fileId
            const dbPost =  await appwriteService.createPost({
                ...data,
                userId: userData.$id,
                synopsis:"string",
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
          }
        }
    }

    const slugTransform = useCallback((value) =>{
        if(value && typeof value === 'string'){
            // const slug = value.toLowerCase().replace(/ /g,'-')
            // setValue('slug', slug)
            // return slug;
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        else{
            return "";
        }
    },[])
    // This method will watch specified inputs and return their values. It is useful to render input value and for determining what to render by condition.
     useEffect(()=>{
        const subscription = watch((value , {name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true});
            }
        })


        return () => subscription.unsubscribe()
        
     },[watch,slugTransform,setValue])

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
         <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
         </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif "
                {...register("image", { required: !post })}
            />
            <Input
                label="Synopsis :"
                type="file"
                className="mb-4"
                accept=".doc, .docx, .pdf "
                {...register("synopsis", { required: false })}
            />
           
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
             {/* <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                /> */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
        </div>
    </form>
    )
}

