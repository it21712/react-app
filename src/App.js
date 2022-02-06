import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation, Outlet} from "react-router-dom";
import Navigation from './Navigation';
import Home from './pages/Home';
import Authentication from './Authentication';
import Profile from './pages/Profile';
import base64 from 'react-native-base64';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {


  

  const [user, setUser] = useState({
    username:localStorage.getItem('username'),
    password:localStorage.getItem('password'),
    loggedIn:localStorage.getItem('loggedIn') === 'true',
    role:localStorage.getItem('role')
  });



  const checkLoggedIn = async (username, password) => {
    const res = await fetch('http://localhost:8080/logged_in',
    {
      headers: new Headers({
        "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`
      })
    }
    );
    //console.log(res.json())
    const data = await res.json();
    if(res.status !== 401){
      setUser({
        username:username,
        password:password,
        loggedIn:true,
        role:data.authorities[0].role
        
      })

      //console.log(user);
    }

    
  };

  useEffect(() => {
    console.log(user)
    checkLoggedIn(user.username, user.password);
    
  }, []);
  


  const PrivateRoute = (props) => {
    
    const location = useLocation();

    return user.loggedIn 
    ? <props.component />
    : <Navigate to="/login" replace state={{ from: location }} />;

    
  }

  const AuthRoute = (props) => {
    
    return !user.loggedIn
    ? <Authentication {...props}/>
    : <Home />
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation user={user} setUser={setUser} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/logout" element={<Logout user={user} setUser={setUser}/>} />
        <Route path='/profile' element={<PrivateRoute component={Profile}/>}/>
        
        
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    
    
  );
}

export default App;
