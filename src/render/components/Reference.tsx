import React from 'react';
import { ReferenceData } from '../../main/DataStorage';
import copyImg from '../assets/img/content_copy_white_24dp.svg';
import editImg from '../assets/img/edit_black_24dp.svg';
import '../assets/styles/reference.css';

interface handelEventFunc {
  (event: any, index: number): void;
}

interface IProps {
  data?: ReferenceData;
  index?: number;
}

const Reference = ({ data, index }: IProps): JSX.Element => {
  const enableEdition = (link: string) => {
    window.electron.dataAPI.requestEditReference(link);
  };
  const copyClipBoard = (text: string) => {
    window.electron.dataAPI.copyClipBoard(text);
  };

  const getRefText = (): string => {
    if (data.authorName === data.authorSurname) {
      return `${data.authorSurname}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`;
    } else {
      return `${data.authorSurname}, ${data.authorName}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`;
    }
  };
  return (
    <div className="row valign-wrapper">
      <div className="col s9">
        <p id={index.toString()}>{getRefText()}</p>
      </div>
      <div className="col s2 offset-s1 ">
        <button
          className="btn-floating btn-container green accent-3"
          onClick={() => {
            copyClipBoard(getRefText());
          }}
        >
          <img className="image-done" src={copyImg} alt="good" />
        </button>
        <button
          className="btn-floating btn-container blue lighten-2"
          onClick={() => {
            enableEdition(data.URL);
          }}
        >
          <img className="image-edit" src={editImg} alt="good" />
        </button>
      </div>
    </div>
  );
};

export default Reference;
