import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active: !authStatus,
    },
    {
      name:"Signup",
      slug:"/signup",
      active: !authStatus,
    },
    {
      name:"All Projects",
      slug:"/all-posts",
      active:authStatus,
    },
    {
      name:"Add Project",
      slug:"/add-post",
      active:authStatus,
    },
  ]

  return (
   <header className='py-2 shadow-md font-medium sticky top-0 left-0  lg:text-lg  bg-[#141E46] z-10 text-slate-200'>
     <Container>
        <nav className='flex items-center flex-col sm:flex-row '>
           <div className=''>
            <Link to='/' className=''>
              <Logo width='80px'/>
            </Link>
           </div>
           <ul className='flex mx-auto sm:mx-0 sm:mt-0 mt-4 sm:ml-auto'>
              {navItems.map((item)=> 
               item.active ? (
                // as html element repeat then we have to add key 
                <li key={item.name}>
                  <button
                   onClick={()=> navigate(item.slug)}
                   className={`inline-block px-2 sm:px-6 py-2 duration-200 hover:text-white hover:scale-105 text-sm sm:text-xl rounded-full`}
                  >{item.name}</button>
                </li> 
               ) : null
              )}
              
              {/* {condition && code}-> code will only execute when condition is true  */}
              {authStatus && (
                <li >
                  <LogoutBtn />
                </li>
              )}
           </ul>
        </nav>
     </Container>
   </header>
  )
}

export default Header
