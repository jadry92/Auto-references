import React, { Component, useLayoutEffect } from 'react';

import { ReferenceData } from './Main'

interface IProps {
  list?: [ReferenceData],
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
          {list.map((ref) => (<li key={ref.id}><Reference data={ref} /></li>))}
        </ul>
      </div>
    )
  }
}

interface IProps2 {
  data?: ReferenceData
}

const Reference = ({ data }: IProps2) => {

  if (data.authorName === data.authorSurname) {
    return (
      <p>
        {`${data.authorSurname}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    )
  } else {
    return (
      <p>
        {`${data.authorSurname}, ${data.authorName}. (${data.yearPublish}). ${data.title} Retrieved from <${data.URL}>`}
      </p>
    )
  }

}


export default ListReference
