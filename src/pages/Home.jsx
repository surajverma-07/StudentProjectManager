import React,{useEffect,useState} from 'react'
import appwriteService from '../Appwrite/config'
import { Container,PostCard } from '../components'
import {useSelector} from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const isUserAuthenticated = useSelector((state)=>state.auth.status);
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  
if(isUserAuthenticated){
    
    return(
        <div className="w-full py-8">
            Welcome To Student Project Manager 
        </div>
    )
}
else{
    return(
      <div className='w-full py-8 mt-4 text-center'>
          <Container>
             <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500 ">
                        Login To See Projects 
                    </h1>
                </div>
             </div>
          </Container>
      </div>
    )

}
}

export default Home
