import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

import UploadImage from './UploadImage'
import SetVariables from './SetVariables';


function AdminInput({setIsMainPage}) {

  const [areVariablesSet,   setAreVariablesSet]    =   useState(false)
  const [counOfInputPages,           setCountOfInputPages] = useState(0)

  const [data,  setData]  = useState(null)
  const [image, setImage] = useState(null)

  const urlInput  = "http://localhost:8000/app/configinput"

  const saveConfig = async (event) => {
      event.preventDefault()
      const formdata = new FormData()

      formdata.append("image", image)
      formdata.append("title", data["title"])
      formdata.append("description", data["description"])
      formdata.append("countOfVariables", data["countOfVariables"])
      formdata.append("variables", JSON.stringify(data["variables"]))
      formdata.append("formula", data["formula"])
      console.log(data["variables"]);
      
      const response = await fetch(urlInput,
      {
          method:         "POST",
          credentials:    "include",
          header:         "multipart/form-data; boundary=something",
          body:           formdata
      }).then(console.log(1)).catch(console.log(2))
                                  
      const content = await response.json()
      console.log(content);
  }


  return (
          <section>
            {areVariablesSet ?
                              <UploadImage  
                                            setImage={(x)=>setImage(x)}
                                            setAreVariablesSet={(x) => setAreVariablesSet(x)}
                                            IncreaseCountOfInputPages={ () => {setCountOfInputPages(counOfInputPages+1)}}
                                            saveConfig={(e)=>saveConfig(e)}
                                            setIsMainPage={(x)=>setIsMainPage(x)}/> 

                              :

                              <SetVariables isSeen={true}
                                            setAreVariablesSet={(x)=>setAreVariablesSet(x)}
                                            setData={(x)=>setData(x)}
                                            counOfInputPages={counOfInputPages}/>}
          </section>
  )
}

export default AdminInput
