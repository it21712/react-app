import React from 'react';
import base64 from 'react-native-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'
import { saveUser } from '../Globals';

const Login = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(props.user)
    let headers = {"Authorization" : `Basic ${base64.encode(`${props.user.username}:${props.user.password}`)}`} 
    

    if(props.user.loggedIn){
        console.log(props.user.loggedIn)
        const { from } = location.state || { from: { pathname: "/profile" } };
        navigate(from, {replace:true});
    }

    const [loginMessage, setLoginMessage] = useState("");

    const onLoginPressed = (event)=> {
        event.preventDefault()
        
        console.log("credentials from form -> "+props.user.username+":"+props.user.password)
        sendCredentials(props.user.username, props.user.password);
        
    };

    const handleInputChange = (event) =>{
        props.setUser(prevUser => ({
            
            ...prevUser,
            [event.target.name] : event.target.value

        }));

    }

    
    const sendCredentials = async (username, password) => {

        const res = await fetch('http://localhost:8080/logged_in',
        {
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`
            })}

            );

            //console.log("Sendin credentials: ", username,":", password)
            if(res.status === 401){
                setLoginMessage("Wrong Credentials. Please try again")

            }else{
                setLoginMessage("")
                const data = await res.json()
                props.setUser({username:`${username}`, password:`${password}`, loggedIn:true, role:data.authorities[0].role})
               saveUser(username,password, true, data.authorities[0].role)
                const { from } = location.state || { from: { pathname: "/profile" } };
                navigate(from, {replace:true});
            }
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
