import React from 'react';
import { ReferenceData } from './Main'

interface handelEventFunc {
  (event: any, index: number): void
}

interface IProps {
  data?: ReferenceData,
  index?: number,
}

const Reference = ({ data, index }: IProps) => {

  if (data.authorName === data.authorSurname) {
    return (
      <p id={index.toString()}>
        {`${data.authorSurname}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    )
  } else {
    return (
      <p id={index.toString()}>
        {`${data.authorSurname}, ${data.authorName}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    )
  }
}

export default Reference;
