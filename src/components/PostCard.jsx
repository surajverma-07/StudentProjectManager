import React from 'react'
import appwriteService from '../Appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-70  h-64  bg-gray-200 rounded-xl p-4 '>
            <div className='w-full justify-center mb-2 '>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl w-64 h-44  m-auto' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}
 
export default PostCard
