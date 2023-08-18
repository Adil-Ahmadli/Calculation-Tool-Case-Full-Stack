import React from 'react'
import Login from "./AdminLoginPage/Login";
import Admin from "./AdminConfigurationPage/Admin";
import { useState, useEffect } from 'react';

function RequireAuth() {
    const [isAuth, setIsAuth] = useState(false)
    const isAuthenticated = async () => {
        const response = await fetch("http://localhost:8000/auth/user",
        {
            method:         "GET",
            headers:        {"Content-Type": "application/json"},
            credentials:    "include"
        })
        const content = await response.json()
        console.log(content);
        if (content["detail"] === "successful") {
            setIsAuth(true);
        }
        else{
            setIsAuth(false);
        }
    };

    useEffect(() => {
      isAuthenticated().then(
        console.log(isAuth)
      ).catch(
        console.log()
      )
    }, [])
    

    return isAuth ? <Admin/> : <Login/>
}

export default RequireAuth;
      
