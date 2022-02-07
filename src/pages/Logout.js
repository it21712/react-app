import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../Globals';

const Logout = (props) => {

    const location = useLocation();
    const navigate = useNavigate();



  const logout = async () => {

    const res = await fetch('http://localhost:8080/logout',
    {
      mode:'cors',
      credentials:'include'
    });

    const data = await res.json();

    console.log(data)
  }

  logout();

    props.setUser(removeUser)
    if(props.user.loggedIn === null) {
        const { from } = location.state || { from: { pathname: "/home" } };
        navigate(from, {replace:true});
    }

  return <div></div>;
};

export default Logout;
