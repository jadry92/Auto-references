import React, { Component } from 'react';
import { ReferenceData } from '../../main/DataStorage';
import Loader from './Loader';
import Reference from './Reference';
import ReferenceForm from './ReferenceForm';
import UrlForm from './UrlForm';

// interfaces

interface handelEventFunc {
  (event: any): void;
}

interface IProps {
  links: Set<string>;
  listReferences?: [ReferenceData];
}

interface IState {}// eslint-disable-line

// Component

class ListReference extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private switchStatus = (item: ReferenceData, index: number): JSX.Element => {
    switch (item.status) {
      case 'ready':
        return <Reference index={index} data={item} />;
      case 'editing':
        return <ReferenceForm index={index} data={item} />;
      case 'wrong-data':
        return <ReferenceForm index={index} data={item} />;
      case 'wrong-link':
        return <UrlForm index={index} data={item} />;
      case 'searching':
        return <Loader />;
      default:
        return <h2>Error!!</h2>;
    }
  };

  render(): JSX.Element {
    const { listReferences } = this.props;

    return (
      <div>
        <ul>
          {listReferences
            ? listReferences.map((item, index) => (
                <li key={item.URL}>{this.switchStatus(item, index)}</li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default ListReference;
