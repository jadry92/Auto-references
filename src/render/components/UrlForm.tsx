import React, { useState } from 'react';
import { ReferenceData } from '../../main/DataStorage';

interface IProps {
  data?: ReferenceData;
  index?: number;
}

const UrlForm = ({ index, data }: IProps): JSX.Element => {
  const link = data.URL;
  const [urlText, setUrlText] = useState(link);

  const handelDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.electron.dataAPI.deleteReference(link);
  };

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlText(event.target.value);
  };

  const handelSearchAgain = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (link !== urlText) {
      window.electron.dataAPI.changeURLAndSearch(link, urlText);
    } else {
      window.electron.dataAPI.processLink(urlText);
    }
  };

  const enableEditing = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (link !== urlText) {
      window.electron.dataAPI.changeURLAndEdit(link, urlText);
    } else {
      window.electron.dataAPI.requestEditReference(urlText);
    }
  };

  return (
    <div className="row">
      <form action="" id="ref_form" className="col s12">
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              name="link"
              className="invalid"
              value={urlText}
              onChange={handelChange}
              id="link"
              placeholder="link"
            />
          </div>
        </div>
        <div className="row">
          <div className="col 2s">
            <button className="btn" onClick={handelSearchAgain}>
              Search Again
            </button>
          </div>
          <div className="col 2s ">
            <button onClick={enableEditing} className="btn green accent-3">
              Enter Manual
            </button>
          </div>
          <div className="col 2s ">
            <button onClick={handelDelete} className="btn red accent-3">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UrlForm;
