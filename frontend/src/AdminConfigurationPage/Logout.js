import React from 'react'
import { useNavigate } from 'react-router'


function Logout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8000/auth/logout",
    {
        method:         "POST",
        headers:        {"Content-Type": "application/json"},
        credentials:    "include",
    })

    const content = await response.json()
    if (content["detail"] === "successful") {
        navigate("/login")
    }
    else{
        alert("something happened. please try again")
    }
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default Logout