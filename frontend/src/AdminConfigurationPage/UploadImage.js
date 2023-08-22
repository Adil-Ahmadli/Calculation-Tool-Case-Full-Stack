function UploadImage({setImage, setAreVariablesSet, IncreaseCountOfInputPages,saveConfig, setIsMainPage}) {

    return (
            <div className="container">
              <h3>Upload an image</h3><br/><br/>
              <label className="mx-3">Choose file:</label><br/>
              <input  onChange={(e) => setImage(e.target.files[0])}
                      className="d-none"
                      type="file"
                      accept="image/"
                      id="imageinput"
                      required/><br/><br/><br/>
              <button
                onClick={(e) => {
                                    setAreVariablesSet(false)
                                    IncreaseCountOfInputPages()
                                    saveConfig(e)
                                    setIsMainPage(true)
                                }}
                type="submit"
              > Submit
              </button>
            </div>
    );
}

export default UploadImage