import React from 'react'


class Main extends React.Component {

  render() {
    return (
      <main>
        <div className="container">
          <div className="row">
            <h1 className="title">Auto References App</h1>
          </div>
          <div className="row">
            <h4 id="form-title" className="show">Add the links:</h4>
            <form className="form-div__form">
              <div id="urls-form-input" className="input-field">
                <textarea name="url" id="url" className="materialize-textarea validate"></textarea>
                <span className="helper-text" data-error="Wrong URl or URLs">write a list of the pages which you would like to
                  reference</span>
              </div>
              <div className="col">
                <a className="btn primary-btn" type="submit" id="scrapping">Generate</a>
              </div>
              <div className="col">
                <a className="btn disabled" type="submit" id="reset">Reset</a>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <ul className="list-group">
          </ul>
        </div>
      </main>
    )
  }
}

export default Main;