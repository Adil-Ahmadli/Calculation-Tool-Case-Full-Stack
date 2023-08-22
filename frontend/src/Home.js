import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const response =  fetch("http://localhost:8000/auth/user",
    {
        method:         "GET",
        headers:        {"Content-Type": "application/json"},
        credentials:    "include"
    }).then(response => {
                          response.json().then(content => {
                                                                  if (content["detail"] === "successful") {
                                                                    navigate("/admin")
                                                                  }
                                                                  else{
                                                                    navigate("/login")
                                                                  }
                                                              }
                                                  )
                        } 
          ).catch(err => console.log(err))
}, [])

  return (
   <></>
  )
}

export default Home