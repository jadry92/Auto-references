import React, { Component } from 'react';
import { ReferenceData } from '../main/DataStorage';
import Reference from './Reference';
import ReferenceForm from './ReferenceForm';
import UrlForm from './UrlForm';

// interfaces

type refStatus = 'searching' | 'ready' | 'wrong-data' | 'wrong-link';

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

  switchStatus = (ref: ReferenceData, index: number): JSX.Element => {
    switch (ref.status) {
      case 'ready':
        return <Reference index={index} data={ref} />;
      case 'wrong-data':
        return <ReferenceForm index={index} data={ref} />;
      case 'wrong-link':
        return <UrlForm index={index} link={ref.URL} />;
      case 'searching':
        return <p>loading</p>;
      default:
        return <h2>Error!!</h2>;
    }
  };

  render(): JSX.Element {
    console.log(this.props.listReferences);
    const { listReferences } = this.props;
    return (
      <div>
        <ul>
          {listReferences
            ? listReferences.map((ref, index) => (
                <li key={index}>{this.switchStatus(ref, index)}</li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default ListReference;
