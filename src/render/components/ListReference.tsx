import React, { Component } from 'react';
import { ReferenceData } from '../../main/DataStorage';
import Loader from './Loader';
import Reference from './Reference';
import ReferenceForm from './ReferenceForm';
import UrlForm from './UrlForm';
import { ListReferences } from './Main';
// interfaces
interface IProps {
  listReferences: ListReferences;
}

interface IState {}// eslint-disable-line

// Component

function ListReference(props: IProps): JSX.Element {
  const switchStatus = (item: ReferenceData, index: number): JSX.Element => {
    switch (item.status) {
      case 'ready':
        return <Reference index={index} reference={item} />;
      case 'editing':
        return <ReferenceForm index={index} reference={item} />;
      case 'wrong-data':
        return <ReferenceForm index={index} reference={item} />;
      case 'wrong-link':
        return <ReferenceForm index={index} reference={item} />;
      case 'searching':
        return <Loader />;
      default:
        return <h2>Error!!</h2>;
    }
  };
  const arrayReferences = Object.values(props.listReferences);
  return (
    <div>
      <ul>
        {arrayReferences
          ? arrayReferences.map((item, index) => (
              <li key={item.URL}>{switchStatus(item, index)}</li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default ListReference;
