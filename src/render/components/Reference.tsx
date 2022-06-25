import React from 'react';
import { ReferenceData } from '../../main/DataStorage';
import copyImg from '../assets/img/content_copy_white_24dp.svg';
import editImg from '../assets/img/edit_black_24dp.svg';
import '../assets/styles/reference.css';

interface IProps {
  reference?: ReferenceData;
  index?: number;
}

const Reference = ({ reference, index }: IProps): JSX.Element => {
  const enableEdition = (id: string) => {
    window.electron.dataAPI.partialUpdateReference(id, { status: 'editing' });
  };
  const copyClipBoard = (text: string) => {
    window.electron.dataAPI.copyClipBoard(text);
  };

  const getRefText = (): string => {
    if (reference.authorName === reference.authorSurname) {
      return `${reference.authorSurname}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
    } else {
      return `${reference.authorSurname}, ${reference.authorName}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
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
            enableEdition(reference.id);
          }}
        >
          <img className="image-edit" src={editImg} alt="good" />
        </button>
      </div>
    </div>
  );
};

export default Reference;
