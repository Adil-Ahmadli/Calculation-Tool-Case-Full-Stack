import {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'

function Login() {
    const validEmailRegExp = /[a-z0-9_]+@[a-z]+\.[a-z]+/

    const navigate = useNavigate()

    const userRef = useRef()
    const errRef  = useRef()

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(true)
    
    const [pwd, setPwd] = useState("")

    const [isError, setIsError]   = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

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
                                                                        setIsAuthenticated(true)
                                                                      }
                                                                  }
                                                      )
                            } 
              ).catch(err => console.log(err))
    }, [])
    
    useEffect(() => {
        setIsError(false)
        setErrorMessage("")
        const result = validEmailRegExp.test(email);
        if (result) {
            setValidEmail(true)
        }
        else{
            setValidEmail(false)
        }
    }, [email])


    const handleSubmit  = async (e) => {
        e.preventDefault();

        if (validEmail){
            const response = await fetch("http://localhost:8000/auth/login",
            {
                method:         "POST",
                headers:        {"Content-Type": "application/json"},
                credentials:    "include",
                body:           JSON.stringify({
                                    "email":    email,
                                    "password": pwd
                                })
            })

            const content = await response.json()
            if (content["detail"] === "successful") {
                navigate("/admin")
            }
            else{
                setIsError(true);
                setErrorMessage("Credentials are not correct!")
            }
        }
        else{
            setIsError(true);
            setErrorMessage("Please enter proper e-mail address!")
        }
    }
                // if cookie send req to /user, if correct navigate to /admin
                // if not cookie render page, send req to /login with data entered
      return ( 
        <>
            { isAuthenticated 
            ? 
                <section>
                    <p ref={errRef} className={isError ? "errmsg" :
                    "offscreen"} aria-live="assertive">
                        {errorMessage}
                    </p>
                    <h1>Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <label > E-mail: </label>
                        <input type="text" id="username"
                            ref={userRef} autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} required/>
                        
                        <label > Password: </label>
                        <input type="password" id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd} required/>

                        <button>Log in</button>
                    </form>
                    <p>
                        Don't have an account?<br/>
                        <span className="line">
                            <a href='#'> Sign up </a>
                        </span>
                    </p>
                </section>
            :
                <>Run the backend server</>  
            }
        </>
    
        )
    }

export default Login