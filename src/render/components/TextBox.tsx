// components
import { valid } from 'node-html-parser';
import React, { ReactEventHandler } from 'react';
import AutoTextArea from './AutoTextArea';
import imgDrop from '../assets/img/expand_more_black_24dp.svg';
import '../assets/styles/textbox.css';
// interfaces
interface handelEventFunc {
  (event: any): void;
}

interface IProps {
  setLinksFromTextBox?: handelEventFunc;
}

interface IState {
  textBoxValue: string;
  wasSendIt: boolean;
  errorMsm: string;
  numberOfLinks: number;
  numberOfLinksValidated: number;
  isTextBoxHidden: boolean;
}

class TextBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isTextBoxHidden: false,
      textBoxValue: '',
      wasSendIt: false,
      errorMsm: '',
      numberOfLinks: 0,
      numberOfLinksValidated: 0
    };
  }

  private handelChangeTextBox = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const rawData = event.target.value;
    this.setState({ textBoxValue: rawData });
  };

  private summitLinks = (event: React.FormEvent): void => {
    event.preventDefault();
    const linksRaw = this.state.textBoxValue.split('\n');
    const arrayLinks = this.cleanData(linksRaw);
    const listOfLinks = new Set(arrayLinks);
    if (listOfLinks.size !== 0) {
      this.props.setLinksFromTextBox(listOfLinks);
      this.setState({
        wasSendIt: true,
        numberOfLinksValidated: listOfLinks.size,
        numberOfLinks: arrayLinks.length,
        errorMsm: '',
        isTextBoxHidden: true
      });
    } else {
      const message =
        'The links are in invalid, Please check and send it again';
      this.setState({
        errorMsm: message
      });
      window.electron.dialogAPI.errorDialog('Wrong Link/s', message);
    }
  };

  private handelBoxClear = (event: React.FormEvent) => {
    this.setState({
      textBoxValue: '',
      wasSendIt: false,
      errorMsm: '',
      numberOfLinks: 0,
      numberOfLinksValidated: 0
    });
  };

  private cleanData(rawData: string[]): string[] {
    // check if the links a correct, use regular expressions predefine
    const arrayLinks = [];
    const wellURL = /^https?:\/\/.+$/g;
    const normalURL = /^w?w?w?\.?.*\.[a-z]{2,5}\/[\w/]{1,}/g;
    rawData.filter((str) => str != '');
    for (const row of rawData) {
      if (row.match(wellURL)) {
        arrayLinks.push(row);
      } else if (row.match(normalURL)) {
        arrayLinks.push('http://' + row);
      } else {
        console.log('invalid link ' + row);
      }
    }
    return arrayLinks;
  }

  toggleHidden = (): void => {
    this.setState({ isTextBoxHidden: !this.state.isTextBoxHidden });
  };

  render(): JSX.Element {
    const {
      textBoxValue,
      wasSendIt,
      errorMsm,
      numberOfLinks,
      numberOfLinksValidated,
      isTextBoxHidden
    } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col s3 ">
            <h4 className="form-title">Links</h4>
          </div>
          <div className="col s1 arrow-container valign-wrapper">
            <img
              src={imgDrop}
              alt=""
              className={isTextBoxHidden ? 'img-arrow-up' : 'img-arrow-down'}
              onClick={this.toggleHidden}
            />
          </div>
        </div>
        <div className="row">
          <form
            hidden={isTextBoxHidden}
            className="form-div__form"
            onSubmit={this.summitLinks}
            onReset={this.handelBoxClear}
          >
            <div id="urls-form-input" className="input-field">
              <AutoTextArea
                onChange={this.handelChangeTextBox}
                value={textBoxValue}
                name="url"
                id="url"
                className={`materialize-textarea validate ${
                  errorMsm === '' ? 'valid' : 'invalid'
                }`}
              ></AutoTextArea>
              <span className={`helper-text ${wasSendIt && 'green-text'}`}>
                {!wasSendIt
                  ? 'write a list of the web pages which you would like to reference'
                  : `${numberOfLinksValidated}/${numberOfLinks} Links was sent to create reference`}
              </span>
              <span className="red-text">
                {errorMsm !== '' && 'There are one or more links wrong typed'}
              </span>
            </div>
            <div className="col">
              <button
                className={`btn ${wasSendIt && 'disabled'}`}
                type="submit"
                id="scrapping"
              >
                Generate
              </button>
            </div>
            <div className="col">
              <button
                //onClick={this.handelBoxClear}
                className={`btn red accent-3 ${
                  textBoxValue === '' ? 'disabled' : ''
                }`}
                type="reset"
                id="reset"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default TextBox;