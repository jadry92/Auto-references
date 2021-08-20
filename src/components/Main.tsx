// react 
import React, { ReactElement } from 'react'

import ListReference from './ListReference'
import TextBox from './TextBox'
import { useState } from 'react'

//Interfaces
type AppStages = "input" | "searching" | "showing"
type KeysData = 'title' | 'authorName' | 'authorSurname' | 'yearPublish'

export interface ReferenceData {
  title: string,
  authorName: string,
  authorSurname: string,
  visitDate: string,
  yearPublish: string,
  URL: string,
  id: string,
  valid?: boolean,
}

interface IProps {
}

interface IState {
  listOfLinks: Set<string>,
  listReferences: [ReferenceData] | [],
  wrongLink: boolean,
  appStage: AppStages,
}

class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      listOfLinks: undefined,
      listReferences: undefined,
      wrongLink: false,
      appStage: "input"
    }
    this.setIpc()
  }

  setIpc = (): void => {
    window.electron.onEventsAPI.onScrapingFinish(this.receiveDataFromScraping)
  }

  receiveDataFromScraping = (event: Event, dataList: [ReferenceData]) => {
    console.log('received', dataList)
    this.setState({ listReferences: dataList, appStage: "showing" })
    this.validInformation()
  }

  summitLinks = (event: MouseEvent) => {
    event.preventDefault()

    if (this.state.listOfLinks) {
      console.log(this.state.listOfLinks)
      this.setState({ appStage: "searching" })
      window.electron.dataAPI.postLinks(this.state.listOfLinks);
    } else {
      console.log('error')
    }
  }

  restSearch = (event: MouseEvent) => {
    event.preventDefault()
    // This function reset the app to initial stage
    this.setState({ appStage: "input" })
  }

  clearBox = (event: MouseEvent) => {
    //event.preventDefault()
    // This function clean the text box
    this.setState({
      appStage: "input",
      listOfLinks: undefined
    })
  }
  
  private validInformation = () => {

    const newListReferences = this.state.listReferences 
    newListReferences.forEach((ref) => {
      if (ref.yearPublish === '') {
        ref.valid = false
      } else if (ref.authorName === '' || ref.authorSurname === '') {
        ref.valid = false
      } else if (ref.title === '') {
        ref.valid = false
      } else {
        ref.valid = true
      }
    })
    this.setState({ listReferences:newListReferences })

  }

  private cleanData(rawData: string[]): string[] {
    // check if the links a correct, use regular expressions predefine
    let arrayLinks = []
    const wellURL = /^https?:\/\/.+$/g;
    const normalURL = /^w?w?w?\.?.*\.[a-z]{2,5}\/[\w\/]{1,}/g;
    rawData.filter(str => str != '')
    for (const row of rawData) {
      if (wellURL.exec(row)) {
        arrayLinks.push(row)
      } else if (normalURL.exec(row)) {
        arrayLinks.push('http://' + row)
      } else {
        this.setState({ wrongLink: true })
      }
    }
    return arrayLinks
  }

  checkLinks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawData = event.target.value.split("\n");
    const arrayLinks = this.cleanData(rawData)
    const listOfLinks = new Set(arrayLinks)
    this.setState({
      listOfLinks: listOfLinks
    })
  }

  handelChangeForm = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = event.target.value;
    const key = event.target.id as KeysData;
    const newListReferences = this.state.listReferences
    newListReferences[index][key] = newValue
    this.setState({
      listReferences: newListReferences
    })
  }

  handelDeleteForm = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()
    const newListReferences = this.state.listReferences
    newListReferences.splice(index,1)
    this.setState({
      listReferences: newListReferences
    })
    if (newListReferences.length === 0) {
      this.setState({appStage: "input"})
    }
  }
  
  handelSaveForm = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()
    console.log(event)
    this.validInformation()
  }

  render() {
    let visualArea: string | ReactElement | {}

    switch (this.state.appStage) {
      case "input": {
        visualArea = <TextBox
          handelClickClear={this.clearBox}
          handelClickSummit={this.summitLinks}
          handelOnChange={this.checkLinks} />
        break;
      }
      case "searching": {
        visualArea = 'Loading..'
        break;
      }
      case "showing": {
        visualArea = <ListReference
          list={this.state.listReferences}
          handelChangeForm={this.handelChangeForm}
          handelDeleteForm={this.handelDeleteForm}
          handelSaveForm={this.handelSaveForm}
        />
        break;
      }
      default: {
        visualArea = 'error'
        break
      }
    }

    return (
      <main>
        <div className="container">
          <div className="row">
            <h1 className="title">Auto References App</h1>
          </div>
          {visualArea}
        </div>
        <div className="container">
          <ul className="list-group">
          </ul>
        </div>
      </main>
    )
  }
}


export default Main;


/*
https://lucybain.com/blog/2017/react-js-when-to-rerender/
https://en.wikipedia.org/wiki/Internet
https://www.youtube.com/watch?v=czfiWiRAG-c
*/