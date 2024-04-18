import React from 'react'
import {useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
        .catch((error)=>console.log("LogoutBtn :: error in loging out :: ",error));
    }

  return (
    <button
    className='inline-bock px-2 text-sm sm:text-xl sm:px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
