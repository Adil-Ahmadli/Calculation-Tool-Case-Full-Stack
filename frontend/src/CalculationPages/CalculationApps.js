import React,  { useState, useEffect }  from 'react'


function CalculationApps() {
  const [page, setpage] = useState([[]])
  const [outputpage, setoutputpage] = useState([[]])
  const [isinput, setisinput] = useState(true)

  const [index, setIndexPage] = useState(0)
  const [length, setlength] = useState(0)


  const variableInptuts = () => {
    const numberOfVariables = page[index].countOfVariables;
    const result = []

    for (let i = 0; i < numberOfVariables; i++) {
      result.push(<>
                    <label > {Object.keys(page[index].variables)[i]}: </label>
                    <input type="number"  id="username"
                                          autoComplete="off"
                                          required
                                          placeholder={Object.values(page[index].variables)[i]}
                                          onChange={(e)=>{}}/> <br />
                  </>
      );
    }

    return <div>{result}</div>;
  };

  function outputvariableInptuts() {
    const numberOfVariables = outputpage[0].countOfVariables;
    const result = []

    for (let i = 0; i < numberOfVariables; i++) {
      result.push(<>
                    <label > {Object.keys(outputpage[0].variables)[i]}: </label>
                    {Object.values(outputpage[0].variables)[i]} <br />
                  </>
      );
    }

    return <div>{result}</div>;
  }

  function handleCalculate() {
    console.log();
  }

  function handleBack() {
    if (!isinput) {
      setisinput(true)
      return
    }
    if (index !== 0) {
      const newIndex = index - 1
      setIndexPage(newIndex)  
    }
  }

  function handleNext() {
    if (index !== (length - 1) && length !== 0) {
      const newIndex = index + 1
      setIndexPage(newIndex)
      return
    }

    if (index === (length - 1) || length === 0) {
      setisinput(false)
    }
  }

  useEffect(() => {
    const response =  fetch("http://localhost:8000/app/configinput",
    {
        method:         "GET",
        headers:        {"Content-Type": "application/json"},
        credentials:    "include"
    }).then(response => {

                          response.json().then(content => {
                                                              if (content.length === 0) {
                                                                setlength(content.length)
                                                              } else {
                                                                setlength(content.length)
                                                                setpage(content)
                                                              }
                                                          }
                                                  )
                        } 
          ).catch(err => console.log(err))

          const response2 =  fetch("http://localhost:8000/app/configoutput",
          {
              method:         "GET",
              headers:        {"Content-Type": "application/json"},
              credentials:    "include"
          }).then(response => {
                                response.json().then(content => {
                                                                    if (content.length === 0) {
                                                                      console.log(content);
                                                                    } else {
                                                                      setoutputpage(content)
                                                                      console.log(content);
                                                                    }
                                                                }
                                                    )
                              } 
                ).catch(err => console.log(err))
      
        }, [])

  return (
          <div> {
                  isinput ?  <>
                                <header><h1>Welcome to (y)our calculation app</h1></header><br/>
                                  <p>
                                    <label><h5>Title:</h5></label>
                                      <>{page[index].title}</><br/><br/>
                                    <label><h5>Description:</h5></label>
                                      <>{page[index].description}</> <br /><br/>
                                    {variableInptuts()}
                                    <img src= {page[index].image}alt="Configured Input Page Image" />
                                  </p>
                                <footer>
                                    <button onClick={handleBack}> Back</button>
                                    <button onClick={handleNext}> Next</button>
                                </footer>
                              </>
                          :
                          <>
                            <header><h1>It is result page</h1></header><br/>
                              <p>
                                <label><h5>Title:</h5></label>
                                  <>{outputpage[0].title}</><br/><br/>
                                <label><h5>Description:</h5></label>
                                  <>{outputpage[0].description}</> <br /><br/>
                                {outputvariableInptuts()}
                                <img src= {outputpage[0].image} alt="Configured Output Page Image" />
                              </p>
                            <footer>
                                <button onClick={handleBack}>Back</button>
                                <button onClick={handleCalculate}> Calculate </button>
                            </footer>
                        </>
                        }
        </div>
  )
}

export default CalculationApps