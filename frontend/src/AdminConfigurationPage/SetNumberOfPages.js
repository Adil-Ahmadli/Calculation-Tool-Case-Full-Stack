import React from 'react'

function SetNumberOfPages({setCountOfInputPages, setAreCountOfInputPagesSet}) {
  return (
      <form>
          <label>Please enter count of input pages:</label>
          <input type="number"    placeholder="Enter count of input pages"
                                  autoComplete="off"
                                  required
                                  onChange={(e) => {setCountOfInputPages(e.target.value)}}/>
          <button type="submit" onClick={(e) => setAreCountOfInputPagesSet(true)}> Forward </button>
      </form>
  )
}

export default SetNumberOfPages