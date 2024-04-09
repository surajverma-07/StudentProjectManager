import React,{useState,useEffect} from 'react'
import { PostCard,Container } from '../components'
import appwriteService from '../Appwrite/config'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
               setPosts(posts.documents)
            }
          }) 
    },[])
 
 if (posts != null){

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap justify-evenly'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
      
    </div>
  )
}else{
    return <div className='py-10'>No Post Availavle</div>
}
}

export default AllPosts
