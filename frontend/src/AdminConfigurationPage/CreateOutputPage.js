import React from 'react'
import AdminOutput from './AdminOutput'

function CreateOutputPage({setIsMainPage, setIsInputPage}) {

    const handleCreateOutputPage =  () => {
        setIsMainPage(false)
        setIsInputPage(false)
    }

    return (
            <button onClick={handleCreateOutputPage}>Create a new output page</button>
    )
}

export default CreateOutputPage