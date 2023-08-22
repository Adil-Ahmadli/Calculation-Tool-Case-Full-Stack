import React from 'react'

function DeleteConfigs() {
  
    const handleDelete = async () => {
        const response = await fetch("http://localhost:8000/app/configinput",
        {
            method:         "DELETE",
            headers:        {"Content-Type": "application/json"},
            credentials:    "include",
        }).then(console.log(1)).catch(console.log(2))

        const response2 = await fetch("http://localhost:8000/app/configoutput",
        {
            method:         "DELETE",
            headers:        {"Content-Type": "application/json"},
            credentials:    "include",
        }).then(console.log(1)).catch(console.log(2))

    }

    return (
        <button onClick={handleDelete}>Delete all configurations</button>
    )
}

export default DeleteConfigs