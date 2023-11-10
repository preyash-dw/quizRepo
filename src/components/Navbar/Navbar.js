import React from 'react'
import "./Navbar.css"
import { useUser } from '../../UserContext';

const Navbar = () => {
  const { userData } = useUser();
  return (
    <div>
       <div className="navbar">
      <div className="navbar-title">QUIZ APPLICATION</div>
      <div className="username-box">
        <div className="username">{userData.email}</div>
        {userData.image && <img src={userData.image} alt="User" />}
      </div>
    </div>
    </div>
  )
}

export default Navbar
