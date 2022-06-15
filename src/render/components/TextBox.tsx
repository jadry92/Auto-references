// components
import React, { useState } from 'react';
import AutoTextArea from './AutoTextArea';
import imgDrop from '../assets/img/expand_more_black_24dp.svg';
import '../assets/styles/textbox.css';

// interfaces
interface handelEventFunc {
  (event: any): void;
}

const cleanData = (rawURLs: string[]): string[] => {
  // check if the links a correct, use regular expressions predefine

  const wellURL = /^https?:\/\/.+$/g;
  const normalURL = /^w?w?w?\.?.*\.[a-z]{2,5}\/[\w/]{1,}/g;
  rawURLs.filter((str) => str != '');

  return rawURLs.map((URL) => {
    if (URL.match(wellURL)) {
      return URL;
    } else if (URL.match(normalURL)) {
      return 'http://' + URL;
    } else {
      console.log('invalid link ' + URL);
    }
  });
};

function TextBox(): JSX.Element {
  const [itWasSent, setItWasSent] = useState(false);
  const [isTextBoxHidden, setIsTextBoxHidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [textBoxValue, setTextBoxValue] = useState<string>();
  const [numberOfURLs, setNumberOfURLs] = useState<number>();
  const [numberOfURLsValidated, setNumberOfURLsValidated] = useState<number>();

  const handelChangeTextBox = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const rawText = event.target.value;
    setTextBoxValue(rawText);
  };

  const handelBoxClear = (event: React.FormEvent) => {
    console.log('cleare');
  };

  const toggleHidden = (): void => {
    setIsTextBoxHidden(!isTextBoxHidden);
  };

  const summitURLs = (event: React.FormEvent): void => {
    event.preventDefault();
    const URLsRaw = textBoxValue.split('\n');
    const setURLs = new Set(cleanData(URLsRaw));
    const listOfURLs = Array.from(setURLs);

    if (listOfURLs.length !== 0) {
      listOfURLs.forEach((URL) => {
        window.electron.dialogAPI.processURL(URL);
      });
      setNumberOfURLs(URLsRaw.length);
      setNumberOfURLsValidated(listOfURLs.length);
      setItWasSent(true);
      setIsTextBoxHidden(true);
    } else {
      const message = 'The URLs are in invalid, Please check and send it again';
      setErrorMsg(message);
      window.electron.dialogAPI.errorDialog('Wrong Link/s', message);
    }
  };

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
            onClick={toggleHidden}
          />
        </div>
      </div>
      <div className="row">
        <form
          hidden={isTextBoxHidden}
          className="form-div__form"
          onSubmit={summitURLs}
          onReset={handelBoxClear}
        >
          <div id="urls-form-input" className="input-field">
            <AutoTextArea
              onChange={handelChangeTextBox}
              value={textBoxValue}
              name="url"
              id="url"
              className={`materialize-textarea validate ${
                errorMsg === '' ? 'valid' : 'invalid'
              }`}
            ></AutoTextArea>
            <span className={`helper-text ${itWasSent && 'green-text'}`}>
              {!itWasSent
                ? 'write a list of the web pages which you would like to reference'
                : `${numberOfURLsValidated}/${numberOfURLs} Links was sent to create reference`}
            </span>
            <span className="red-text">
              {errorMsg !== '' && 'There are one or more links wrong typed'}
            </span>
          </div>
          <div className="col">
            <button
              className={`btn ${itWasSent && 'disabled'}`}
              type="submit"
              id="scrapping"
            >
              Generate
            </button>
          </div>
          <div className="col">
            <button
              //onClick={handelBoxClear}
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

export default TextBox;
