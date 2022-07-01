import React from 'react';
import { ReferenceData } from '../../main/DataStorage';
import Loader from './Loader';
import Reference from './Reference';
import ReferenceForm from './ReferenceForm';
import { ListReferences } from './Main';

// interfaces
interface IProps {
  listReferences: ListReferences;
}

// Component

function ListReference(props: IProps): JSX.Element {
  const switchStatus = (item: ReferenceData): JSX.Element => {
    switch (item.status) {
      case 'ready':
        return <Reference reference={item} />;
      case 'editing':
        return <ReferenceForm reference={item} />;
      case 'wrong-data':
        return <ReferenceForm reference={item} />;
      case 'wrong-link':
        return <ReferenceForm reference={item} />;
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
          ? arrayReferences.map((item) => (
              <li key={item.id}>{switchStatus(item)}</li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default ListReference;
