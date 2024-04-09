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
   <header className='py-3 shadow-md bg-gray-500'>
     <Container>
        <nav className='flex'>
           <div className='mr-4'>
            <Link to='/'>
              <Logo width='80px'/>
            </Link>
           </div>
           <ul className='flex ml-auto'>
              {navItems.map((item)=> 
               item.active ? (
                // as html element repeat then we have to add key 
                <li key={item.name}>
                  <button
                   onClick={()=> navigate(item.slug)}
                   className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
               ) : null
              )}
              
              {/* {condition && code}-> code will only execute when condition is true  */}
              {authStatus && (
                <li>
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
