import React from 'react'

import { BrowserRouter, Link } from "react-router-dom"
import { Menu } from 'antd'

function Navbar(props) {
  return (
     <Menu mode="horizontal">
       <Menu.Item key='Home'>
         <BrowserRouter>
           <Link to="/">Home</Link>
         </BrowserRouter>
       </Menu.Item>
       <Menu.Item key='Login'>
         <BrowserRouter>
           <Link to="/signin">Sign In</Link>
         </BrowserRouter>
       </Menu.Item>
       <Menu.Item key='SignUp'>
         <BrowserRouter>
           <Link to="/signup">Sign Up</Link>
         </BrowserRouter>
       </Menu.Item>
     </Menu>
  )
}

export default Navbar
