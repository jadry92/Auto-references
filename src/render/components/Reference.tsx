import React from 'react';
import { ReferenceData } from '../../main/DataStorage';
import { parseReferenceToText } from '../utils';
import copyImg from '../assets/img/content_copy_white_24dp.svg';
import editImg from '../assets/img/edit_black_24dp.svg';
import '../assets/styles/reference.css';

interface IProps {
  reference?: ReferenceData;
}

const Reference = ({ reference }: IProps): JSX.Element => {
  const enableEdition = (id: string) => {
    window.electron.dataAPI.partialUpdateReference(id, { status: 'editing' });
  };
  const copyClipBoard = (reference: ReferenceData) => {
    const text = parseReferenceToText(reference);
    window.electron.dataAPI.copyClipBoard(text);
  };

  return (
    <div className="row valign-wrapper">
      <div className="col s9">
        <p id={reference.id}>{parseReferenceToText(reference)}</p>
      </div>
      <div className="col s2 offset-s1 ">
        <button
          className="btn-floating btn-container green accent-3"
          onClick={() => {
            copyClipBoard(reference);
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
