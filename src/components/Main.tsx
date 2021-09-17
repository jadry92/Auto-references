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

  // ICP communication
  setIpc = (): void => {
    window.electron.onEventsAPI.onProcessLinkReady(this.requestData);
    window.electron.onEventsAPI.onReferenceReady(this.setListReference);
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

  // Text box actions

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

  setLinksFromTextBox = (listOfLinks: Set<string>): void => {
    if (listOfLinks) {
      listOfLinks.forEach((link) => {
        window.electron.dataAPI.processLink(link);
      });
      this.setState({
        listOfLinks: listOfLinks
      });
    } else {
      console.log('error no links in listOfLinks');
    }
  };

  // Update form handler

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

  //TODO: Re-request data link

  //TODO: Delete link handler

  render(): JSX.Element {
    console.log(this.state.listOfLinks);
    return (
      <main>
        <div className="container">
          <div className="row">
            <h1 className="title">Auto References </h1>
          </div>
          <div className="row">
            <TextBox setLinksFromTextBox={this.setLinksFromTextBox} />
          </div>
          <div className="row">
            <ListReference
              links={this.state.listOfLinks}
              listReferences={this.state.listReferences}
            />
          </div>
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
