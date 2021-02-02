import React from 'react'

import { Link } from "react-router-dom"
import { Menu } from 'antd'

function Navbar(props) {
  return (
     <Menu mode="horizontal">
       <Menu.Item key='Home'>
         <Link to="/">Home</Link>
       </Menu.Item>
       {(props.userData.id && (props.userData.role === "MANAGER" ||
         props.userData.role === "ADMIN"))
         ? <Menu.Item key='Users'>
             <Link to="/user-feed">Users</Link>
           </Menu.Item>
         : null
       }
       {props.userData.id
         ? <Menu.Item key='Times'>
               <Link to="/feed">My Times</Link>
           </Menu.Item>
         : <Menu.Item key='Login'>
               <Link to="/signin">Sign In</Link>
           </Menu.Item>
       }
       {props.userData.id
         ?  <Menu.Item key='LogOut'>
                <Link to="/signout">Log Out</Link>
            </Menu.Item>

         :  <Menu.Item key='SignUp'>
                <Link to="/signup">Sign Up</Link>
            </Menu.Item>
       }
     </Menu>
  )
}

export default Navbar
