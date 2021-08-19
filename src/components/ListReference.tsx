import React, { Component, useLayoutEffect } from 'react';

import Reference from './Reference';
import { ReferenceData } from './Main';
import ReferenceForm from './ReferenceForm';

interface handelEventFunc {
  (event: any, index: number): void
}

interface IProps {
  list?: [ReferenceData],
  handelChange?: handelEventFunc,
  handelDelete?: handelEventFunc,
  handelSave?: handelEventFunc,
}

interface IState {
}

class ListReference extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  private validInformation = () => {

    this.props.list.forEach((ref) => {
      if (ref.yearPublish === '0000') {
        ref.valid = false
      } else if (ref.authorName === '' || ref.authorSurname === '') {
        ref.valid = false
      } else if (ref.title === '') {
        ref.valid = false
      } else {
        ref.valid = true
      }
    })

  }

  componentWillUnmount = () => {
    this.validInformation()
  }

  render() {
    const { list } = this.props
    return (
      <div>
        <ul>
          {list.map((ref, index) => (
            <li key={index}>
              {ref.valid ?
                <Reference data={ref} index={index} /> :
                <ReferenceForm data={ref} handelChange={this.props.handelChange} index={index} />
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}



export default ListReference
