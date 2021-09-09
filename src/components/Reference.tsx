import React from 'react';
import { ReferenceData } from '../main/DataStorage';
import doneImg from '../assets/img/check_circle_black_24dp.svg';
import editImg from '../assets/img/edit_black_24dp.svg';
import '../assets/style.css';

interface handelEventFunc {
  (event: any, index: number): void;
}

interface IProps {
  data?: ReferenceData;
  index?: number;
}

const Reference = ({ data, index }: IProps): JSX.Element => {
  let ref: JSX.Element;
  if (data.authorName === data.authorSurname) {
    ref = (
      <p id={index.toString()}>
        {`${data.authorSurname}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    );
  } else {
    ref = (
      <p id={index.toString()}>
        {`${data.authorSurname}, ${data.authorName}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    );
  }
  return (
    <div className="row valign-wrapper">
      <div className="col s9">{ref}</div>
      <div className="col s2 offset-s1 ">
        <button className="btn-floating btn-container">
          <img className="image-done" src={doneImg} alt="good" />
        </button>
        <button className="btn-floating btn-container">
          <img className="image-edit" src={editImg} alt="good" />
        </button>
      </div>
    </div>
  );
};

export default Reference;
