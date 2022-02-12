import React, { useEffect, useState } from 'react';
import base64 from 'react-native-base64';

const Profile = (props) => {


    let role = props.user.role;
    role = role.substring(role.indexOf("_") + 1).toLowerCase();

    const[userInfo, setUserInfo] = useState({
        username:'',
        fullName:'',
        region:'',
        address:'',
        phoneNumber:'',
        email:'',
        vetName:'',
        role: role

    });

    const getUserInfo = async () => {
        const res = await fetch('http://localhost:8080/'+`${userInfo.role}`+'/home',
        
        {
            mode:'cors',
            credentials:'include'
        }

        );


        const data = await res.json();

        //setUserInfo(data.fullName);

        setUserInfo(prevCreds => ({
            
            ...prevCreds,
            username : data.username,
            fullName : data.fullName,
            region : data.region,
            address : data.address,
            phoneNumber : data.phoneNumber,
            email : data.email,
            vetName : data.vetName,

        }));
    


    }

    useEffect(()=>{
        getUserInfo();
    },[])

  return (
  <>
    <h2>Your Profile</h2>

    <div>Username: {userInfo.username}</div>
    <div>Full Name: {userInfo.fullName}</div>
    <div>Region: {userInfo.region}</div>
    { typeof userInfo.address !== "undefined" && <div>Address: {userInfo.address}</div>}
    { typeof userInfo.phoneNumber !== "undefined" && <div>Phone Number: {userInfo.phoneNumber}</div>}
    { typeof userInfo.email !== "undefined" && <div>Email: {userInfo.email}</div>}
    { typeof userInfo.vetName !== "undefined" && <div>Veterinary Name: {userInfo.vetName}</div>}
    <div>You are connected as a '{userInfo.role}'</div>

    
  </>
  )
};

export default Profile;
