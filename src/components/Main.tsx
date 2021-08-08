// electron
import { } from 'electron';
// react 
import React, { ReactElement } from 'react'
// components 
import TextBox from './TextBox'


//Interfaces
type AppStages = "input" | "searching" | "showing"

interface ReferenceData {
  title: string,
  authorName: string,
  authorSurname: string,
  visitDate: string,
  yearPublish: string,
  URL: string,
  id: string
}

interface IProps {
}

interface IState {
  listOfLinks: Set<string>,
  listReferences: [ReferenceData],
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
    //this.setIpc()
  }

  setIpc = (): void => {
    //ipcRenderer.on('data-ready', (event: Event, dataList: [ReferenceData]) => {
    //this.setState({ listReferences: dataList, appStage: "showing" })
    //})
  }
  summitLinks = (event: MouseEvent) => {
    event.preventDefault()

    if (this.state.listOfLinks) {
      console.log(this.state.listOfLinks)
      this.setState({ appStage: "searching" })
      //electron.notificationApi.sendNotification("Finally!");
      //ipcRenderer.send('submit-form', this.state.listOfLinks)
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
        //visualArea = this.state.listReferences
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