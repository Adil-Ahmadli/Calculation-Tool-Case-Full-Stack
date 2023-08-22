import React from 'react'
import AdminInput from './AdminInput'

function CreateInputPage({setIsMainPage, setIsInputPage}) {

    const handleCreateInputPage =  () => {
        setIsMainPage(false)
        setIsInputPage(true)
    }

    return (
            <button onClick={handleCreateInputPage}>Create a new input page</button>
    )
}

export default CreateInputPage