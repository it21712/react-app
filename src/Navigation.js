import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Navigation.css';

const Navigation = (props) => {


    let logPath = `${props.user.loggedIn ? "logout":"login"}`

    let role = props.user.role;

  return (
    <div>
        <nav>
        <ul className="bar">
           
            <li><Link className="node" to="/home">Home</Link></li>
            <li><Link className='node' to='/profile'>Profile</Link></li>
            {props.user.loggedIn ? <li className='right'><Link className='node' to='/logout'>Logout</Link></li>:
            <li className='right'><Link className='node' to='/login'>Login</Link></li> }
            { role === 'ROLE_CITIZEN' && <li><Link className='node' to='/add-pet'>Add Pet</Link></li>}
            { role === 'ROLE_CITIZEN' && <li><Link className='node' to='/view-pets'>View Pets</Link></li>}
            { role === 'ROLE_VET' && <li><Link className='node' to='/view-pending'>View Pending</Link></li>}
            {/* { role === 'ROLE_VET' && <li><Link className='node' to='/verify-pet'>Verify Pet</Link></li>} */}
            { role === 'ROLE_VET' && <li><Link className='node' to='/update-pet'>Update Pet</Link></li>}
            { role === 'ROLE_CIVIC' && <li><Link className='node' to='/show-pets'>Find Pets</Link></li>}
           
        </ul>
        </nav>  
        <Outlet/>
    </div>
  );
};

export default Navigation;
