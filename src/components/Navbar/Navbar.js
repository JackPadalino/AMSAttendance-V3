import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { resetUser } from "../../store/userSlice";

const navBarStyle = {
  display:'flex',
  justifyContent:'space-between'
};

const navBarLeft = {
  display:'flex',
  gap:'10px'
};

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <div style={navBarStyle}>
      <div style={navBarLeft}>
        <Link to="/">Home</Link>
        {!user.id && <Link to="/login">Login</Link>}
        {user.id && <Link to="/schedules">Schedules</Link>}
        {user.id && <Link to="/absences">Absences</Link>}
        {user.id && <Link to="/teachers">Teachers</Link>}
        {user.id && <Link to="/classes">Classes</Link>}
      </div>
      <div className='navBarRight'>
        {user.id && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;