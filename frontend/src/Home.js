import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/login")
  }, [])
  
  return (
   <></>
  )
}

export default Home