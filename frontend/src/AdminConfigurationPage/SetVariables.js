import React, { useState } from 'react'

function SetVariables({isSeen, setAreVariablesSet, setData, counOfInputPages }) {
  const [isClickedSaveButton,  setIsClickedSaveButton]  =   useState(false);

  const [title,             setTitle]              =   useState("");
  const [description,       setDescription]        =   useState("");
  const [numberOfVariables, setNumberOfVariables]  =   useState(0);
  const [variables,         setVariables]          =   useState({});
  const [formula,           setFormula]            =   useState("");

  const [variable,  setVariable]     =   useState("");
  const [value,     setValue]        =   useState(0);

  const renderVariableList = () => {
    const result = []

    for (let i = 0; i < numberOfVariables; i++) {   
      result.push(<>
                    <label > Variable: </label>
                    <input type="text"  id="username"
                                        autoComplete="off"
                                        required 
                                        placeholder='Enter a name of a variable'
                                        onChange={(e)=>{
                                          setVariable(e.target.value)
                                          if (!isSeen) {
                                            const newVariables = variables
                                            newVariables[variable] = Number(value)
                                            setVariables(newVariables)
                                  }}}/>
                                        
                    { isSeen && <><label > Default value: </label>
                    <input type="number"    placeholder="Enter default value for previous variable"
                                            id="username"
                                            autoComplete="off"
                                            required
                                            onChange={(e)=>{
                                                setValue(e.target.value)
                                                const newVariables = variables
                                                newVariables[variable] = Number(value)
                                                setVariables(newVariables)
}}/></>}
                    </>
      );
    }

      result.push( <>
                      {
                        isSeen && <>
                                      <label > Formula: </label>
                                      <input type="text"  id="username"
                                                          autoComplete="off"
                                                          required
                                                          placeholder='Enter formula'
                                                          onChange={(e)=>setFormula(e.target.value)}/>
                                  </>
                      }

                      <button type="submit"   onClick={()=>{
                                                                setAreVariablesSet(true)
                                                                console.log(variables)
                                                                setData({
                                                                        "title":             title,
                                                                        "description":       description,
                                                                        "countOfVariables":  numberOfVariables,
                                                                        "variables":         variables,
                                                                        "formula":           formula
                                                                })
                                                        }}>  
                                Save Configurations
                      </button>
                    </>
                  )

    return <>{result}</>;
  };


  return (
    <form>
        <label > Title: </label>
        <input type="text"  id="username"
                            autoComplete="off"
                            required 
                            placeholder='Enter title'
                            onChange={(e)=>{
                                setTitle(e.target.value)
                                setIsClickedSaveButton(false)
                                }}/>

        <label > Description: </label>
        <input type="text"  id="username"
                            autoComplete="off"
                            required 
                            placeholder='Enter description'
                            onChange={(e)=>{
                                setDescription(e.target.value)
                                setIsClickedSaveButton(false)
                            }}/>

        <label > Number of variables: </label>
        <input  type="number"   placeholder="Enter number of variables"
                                id="username"
                                autoComplete="off"
                                required 
                                onChange={(e) => {
                                                    setIsClickedSaveButton(false)
                                                    setNumberOfVariables(e.target.value)
                                                }}/>
    
        { isClickedSaveButton && numberOfVariables>0 && title !== "" && description !== "" ?
            <>
                <br/>
                    {renderVariableList()}
            </>
        : 
            <>
                <button onClick={()=>setIsClickedSaveButton(true)}> Generate variables </button>
                <label>Enter data and click the button</label>  
            </>
        }
    </form>
  )
}

export default SetVariables