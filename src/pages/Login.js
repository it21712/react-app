import React from 'react';
import base64 from 'react-native-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'
import { saveUser } from '../Globals';

const Login = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({username:'', password:''}) 

    console.log(props.user)
    

    if(props.user.loggedIn){
        const { from } = location.state || { from: { pathname: "/home" } };
        navigate(from, {replace:true});
    }

    const [loginMessage, setLoginMessage] = useState("");

    const onLoginPressed = (event)=> {
        event.preventDefault()
        
        sendCredentials(credentials.username, credentials.password);
        
    };

    const handleInputChange = (event) =>{
        setCredentials(prevCreds => ({
            
            ...prevCreds,
            [event.target.name] : event.target.value

        }));

    }

    
    const sendCredentials = async (username, password) => {

        const res = await fetch('http://localhost:8080/logged_in',
        {
            mode:'cors',
            credentials:'include',
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`
            })}

            )
            .then(response => response.json())
            .then(data => {
                const responseRole = data.authorities[0].role;
                if(responseRole === 'ROLE_ANONYMOUS' || responseRole === 'ROLE_ADMIN'){
                    setLoginMessage("Wrong Credentials. Please try again")
                    console.log('logged out')
                  }else{
                    console.log('logged in')
                    
                    props.setUser({role:data.authorities[0].role, loggedIn:true})
                    const { from } = location.state || { from: { pathname: "/profile" } };
                    navigate(from, {replace:true});
                  }
            })

        }


  return (
      <>
        <h2 style={{textAlign:"center"}}>Sign In</h2>
        <h3 style={{textAlign:"center"}}>{loginMessage}</h3>
        <div className='center'>

        
            <form method="post" onSubmit={onLoginPressed}>
                <div>
                    
                    <input id="username" type="text" name="username" autoComplete='off'
                        placeholder="Your Username" onChange={handleInputChange.bind(this)}/>
                </div>

                <div>
                
                    <input id="password" type="password" name="password" autoComplete='off'
                        placeholder="Your Password" onChange={handleInputChange.bind(this)}/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>

            </form>
    
    </div>

      </>
    
  );
};

export default Login;
