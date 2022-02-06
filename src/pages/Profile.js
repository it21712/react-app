import React, { useEffect, useState } from 'react';
import base64 from 'react-native-base64';

const Profile = (props) => {


    const[fullName, setFullName] = useState('');
    let role = props.user.role;
        let rolePath='';
        switch(role){
            case 'ROLE_CITIZEN':
                rolePath='citizen'
                break;
            case 'ROLE_VET':
                rolePath='vet'
                break;
            case 'ROLE_CIVIC':
                rolePath='civic'
                break;
            default:
                break;
        };
    const getUserInfo = async () => {
        
        
            
        
        const res = await fetch('http://localhost:8080/'+`${rolePath}`+'/home',
        
        {
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${props.user.username}:${props.user.password}`)}`
            })
        }

        );

        const data = await res.json();

        setFullName(data.fullName);
    }

    useEffect(()=>{
        getUserInfo();
    },[])

  return (
  <>
    <h2>{fullName}</h2>
    
  </>
  )
};

export default Profile;
