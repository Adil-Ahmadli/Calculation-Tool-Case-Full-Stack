import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Logout from './Logout';
import DeleteConfigs from './DeleteConfigs';
import CreateInputPage from "./CreateInputPage";
import CreateOutputPage from './CreateOutputPage';

import AdminInput from "./AdminInput";
import AdminOutput from './AdminOutput';

function Admin() {
  const navigate = useNavigate()

  const [areVariablesSet,   setAreVariablesSet]    =   useState(false)
  const [areCountOfInputPagesSet, setAreCountOfInputPagesSet] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [isMainPage,  setIsMainPage]  = useState(true)
  const [isInputPage, setIsInputPage] = useState(false)


  const [counOfInputPages,           setCountOfInputPages] = useState(0)
  const [counOfConfiguredInputPages, setCounOfConfiguredInputPages] = useState(0)

  const [data,  setData]  = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
      const response =  fetch("http://localhost:8000/auth/user",
      {
          method:         "GET",
          headers:        {"Content-Type": "application/json"},
          credentials:    "include"
      }).then(response => {
                            response.json().then(content => {
                                                                    if (content["detail"] === "successful") {
                                                                      setIsAuthenticated(true)
                                                                    }
                                                                    else{
                                                                      console.log(content);
                                                                      navigate("/login")
                                                                    }
                                                                }
                                                    )
                          } 
            ).catch(err => console.log(err))
  }, [])
  



  return (
      isAuthenticated ?    
                            <> 
                                {isMainPage ?   <section>
                                                      <CreateInputPage  setIsMainPage={x=>setIsMainPage(x)}
                                                                        setIsInputPage={x=>setIsInputPage(x)}/>
                                                      <CreateOutputPage setIsMainPage={x=>setIsMainPage(x)}
                                                                        setIsInputPage={x=>setIsInputPage(x)}/>
                                                      <Logout/>
                                                      <DeleteConfigs/>
                                                </section> 
                                : 
                                  <>
                                        {
                                            isInputPage ?   <section>
                                                                <AdminInput setIsMainPage={x=>setIsMainPage(x)}/>
                                                            </section> 
                                : 
                                                          <section>
                                                                <AdminOutput setIsMainPage={x=>setIsMainPage(x)}/>
                                                            </section> 
                                }  
                                  </>
                                }
                            </>                                                
                    : 
                       <>
                        Run the backend server
                       </>
  
  )
}

export default Admin
