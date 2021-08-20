import React, { Component, useLayoutEffect } from 'react';

import Reference from './Reference';
import { ReferenceData } from './Main';
import ReferenceForm from './ReferenceForm';

interface handelEventFunc {
  (event: any, index: number): void
}

interface IProps {
  list?: [ReferenceData] | [],
  handelChangeForm?: handelEventFunc,
  handelDeleteForm?: handelEventFunc,
  handelSaveForm?: handelEventFunc,
}

interface IState {
}

class ListReference extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }


  render() {
    const { list } = this.props
    console.log('render list', list[0].valid)
    return (
      <div>
        <ul>
          {list.map((ref, index) => (
            <li key={index}>
              {ref.valid ?
                <Reference data={ref} index={index} /> :
                <ReferenceForm 
                data={ref} 
                handelChange={this.props.handelChangeForm}
                handelDelete={this.props.handelDeleteForm}
                handelSave={this.props.handelSaveForm}
                index={index} />
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}



export default ListReference
