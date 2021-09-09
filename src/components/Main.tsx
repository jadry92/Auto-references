/**


 Author: Johan Suarez
 */
// react
import React, { ReactElement } from 'react';
import ListReference from './ListReference';
import TextBox from './TextBox';
import { ReferenceData } from '../main/DataStorage';
import copyImg from '../assets/img/content_copy_black_24dp.svg';

//Interfaces
type AppStages = 'input' | 'output';
type KeysData = 'title' | 'authorName' | 'authorSurname' | 'yearPublish';

interface IProps {}// eslint-disable-line

interface IState {
  listOfLinks: Set<string>;
  listReferences?: [ReferenceData];
  appStage: AppStages;
}

// Components
class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      listOfLinks: undefined,
      appStage: 'input'
    };
    this.setIpc();
  }

  setIpc = (): void => {
    window.electron.onEventsAPI.onProcessLinkReady(this.requestData);
    window.electron.onEventsAPI.onReferenceReady(this.setListReference);
  };

  summitLinks = (event: MouseEvent): void => {
    event.preventDefault();

    if (this.state.listOfLinks) {
      this.state.listOfLinks.forEach((link) => {
        window.electron.dataAPI.processLink(link);
      });
      this.setState({ appStage: 'output' });
    } else {
      console.log('error');
    }
  };

  requestData = (event: Event, link: string): void => {
    window.electron.dataAPI.getReference(link);
  };

  setListReference = (
    event: Event,
    referencesReceived: ReferenceData
  ): void => {
    const actualData = this.state.listReferences;
    if (actualData) {
      const index = actualData.findIndex(
        (obj) => obj.URL === referencesReceived.URL
      );
      if (index != -1) {
        actualData[index] = referencesReceived;
      } else {
        actualData.push(referencesReceived);
      }
      this.setState({ listReferences: actualData });
    } else {
      this.setState({ listReferences: [referencesReceived] });
    }
  };

  restSearch = (event: MouseEvent): void => {
    event.preventDefault();
    // This function reset the app to initial stage
    this.setState({ appStage: 'input' });
  };

  clearBox = (event: MouseEvent): void => {
    event.preventDefault();
    // This function clean the text box
    this.setState({
      appStage: 'input',
      listOfLinks: undefined
    });
  };

  private cleanData(rawData: string[]): string[] {
    // check if the links a correct, use regular expressions predefine
    const arrayLinks = [];
    const wellURL = /^https?:\/\/.+$/g;
    const normalURL = /^w?w?w?\.?.*\.[a-z]{2,5}\/[\w/]{1,}/g;
    rawData.filter((str) => str != '');
    for (const row of rawData) {
      if (wellURL.exec(row)) {
        arrayLinks.push(row);
      } else if (normalURL.exec(row)) {
        arrayLinks.push('http://' + row);
      } else {
        // this.setState({ wrongLink: true });
      }
    }
    return arrayLinks;
  }

  handelChangeTextBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const rawData = event.target.value.split('\n');
    const arrayLinks = this.cleanData(rawData);
    const listOfLinks = new Set(arrayLinks);
    this.setState({
      listOfLinks: listOfLinks
    });
  };

  handelChangeForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newValue = event.target.value;
    const key = event.target.id as KeysData;
    const newListReferences = this.state.listReferences;
    newListReferences[index][key] = newValue;
    this.setState({
      listReferences: newListReferences
    });
  };

  handelSaveForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    event.preventDefault();
  };

  handelDeleteForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    event.preventDefault();
    const newListReferences = this.state.listReferences;
    newListReferences.splice(index, 1);
    this.setState({
      listReferences: newListReferences
    });
    if (!newListReferences.length) {
      this.setState({
        appStage: 'input',
        listOfLinks: undefined
      });
    }
  };

  render(): JSX.Element {
    let visualArea: ReactElement;

    switch (this.state.appStage) {
      case 'input': {
        visualArea = (
          <TextBox
            handelClickClear={this.clearBox}
            handelClickSummit={this.summitLinks}
            handelOnChange={this.handelChangeTextBox}
          />
        );
        break;
      }
      case 'output': {
        visualArea = (
          <ListReference
            links={this.state.listOfLinks}
            listReferences={this.state.listReferences}
          />
        );
        break;
      }
      default: {
        visualArea = <h1>error</h1>;
        break;
      }
    }

    return (
      <main>
        <div className="container">
          <div className="row">
            <h1 className="title">Auto References </h1>
          </div>
          <div className="row">{visualArea}</div>
          <div className="row">
            <div className="col s1 offset-s9">
              {this.state.appStage === 'output' ? (
                <button className="btn">
                  <img src={copyImg} className="img-copy" alt="copy" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;

/*
https://www.flase-domaion.com
https://lucybain.com/blog/2017/react-js-when-to-rerender/
https://www.youtube.com/watch?v=2tUu_zRhPMg
https://en.wikipedia.org/wiki/Internet
https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf
*/
