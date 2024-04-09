import React from 'react'
import logo from './../assets/logo.png'
function Logo({width="100px"}) {
  return (
    <div className=""><img src={logo} alt="LOGO" style={{width:width}} /></div>
  )
}

export default Logo
