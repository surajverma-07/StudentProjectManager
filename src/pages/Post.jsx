import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  // const userState = useSelector((state) => state.auth.status);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const isAdmin = (userData.email === 'suraj1@gmail.com')?true:false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bgmain1 text-slate-200">
      <Container>
        <div className="w-full flex  justify-center  mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-[37rem] w-auto "
          />
         

          {(isAdmin||isAuthor) && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="my-0 flex gap-x-8 justify-center">
        {post.synopsis && 
          
          <Button onClick={()=>(window.open(appwriteService.getFileDownload(post.synopsis),"_blank"))} className="h-12 w-48 p-2">Download Synopsis</Button>
        }
        {post.ppt &&  
        
          <Button onClick={()=>(window.open(appwriteService.getFileDownload(post.ppt),"_blank"))} className="h-12  w-48 p-2">Download ppt </Button>
         }
        </div>
        <div className="w-full lg:my-8 my-6">
          <h1 className="text-2xl font-bold text-center fontpop text-orange-500">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
