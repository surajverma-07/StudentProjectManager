import React from 'react'
import appwriteService from '../Appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className='flex-wrap flex justify-between  px-1'>
        <div className='w-70  h-64 hover:bg-blue-300 bg-slate-300 hover:scale-110 rounded-xl flex flex-col text-black fontpop p-4 '>
            <div className='w-full justify-center  '>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl w-64 h-44  m-auto' />

            </div>
            <h2
            className='text-xl font-bold justify-center glow m-auto items-center'
            >{title}</h2>
        </div>
    </Link>
  )
}
 
export default PostCard
