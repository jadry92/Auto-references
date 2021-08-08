// react
import React from "react";
// components
import AutoTextArea from "./AutoTextArea"
// interfaces
interface handelEventFunc {
  (event: any): any
}

interface IProps {
  handelOnChange?: handelEventFunc,
  handelClickSummit?: handelEventFunc,
  handelClickClear?: handelEventFunc,
}

interface IState {
}

class TextBox extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

  }

  render() {


    return (
      <div className="row">
        <h4 id="form-title" className="show">Add the links:</h4>
        <form className="form-div__form">
          <div id="urls-form-input" className="input-field">
            <AutoTextArea onInput={this.props.handelOnChange} name="url" id="url" className="materialize-textarea validate"></AutoTextArea>
            <span className="helper-text" data-error="Wrong URl or URLs">write a list of the pages which you would like to
              reference</span>
          </div>
          <div className="col">
            <button onClick={this.props.handelClickSummit} className="btn primary-btn" type="submit" id="scrapping">Generate</button>
          </div>
          <div className="col">
            <button onClick={this.props.handelClickClear} className="btn primary-warning" type="reset" id="reset" defaultValue="">Clear</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TextBox;