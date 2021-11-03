/**
 Author: Johan Suarez
 */
// react
import React from 'react';
import { IpcRendererEvent } from 'electron/main';
import ListReference from './ListReference';
import TextBox from './TextBox';
import { ReferenceData } from '../../main/DataStorage';
import copyImg from '../assets/img/content_copy_black_24dp.svg';
import offLineImg from '../assets/img/cloud_off_black_24dp.svg';
import onLineImg from '../assets/img/cloud_done_black_24dp.svg';

//Interfaces

interface IProps {}// eslint-disable-line

interface IState {
  listOfLinks?: Set<string>;
  listReferences?: [ReferenceData];
}

// Components
class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      listOfLinks: undefined,
      listReferences: undefined
    };
    this.setIpc();
  }

  // ICP communication
  setIpc = (): void => {
    window.electron.onEventsAPI.onProcessLinkReady(this.requestData);
    window.electron.onEventsAPI.onReferenceReady(this.setListReference);
    window.electron.onEventsAPI.onChangeReference(this.onChangeReference);
    window.electron.onEventsAPI.onChangeUrl(this.onUrlChange);
  };

  public onUrlChange = (
    event: IpcRendererEvent,
    oldLink: string,
    newLink: string,
    action: string,
    status: boolean
  ): void => {
    if (status) {
      if (action === 'change-url-search') {
        this.dropReference(oldLink);
        this.addLink(newLink);
        window.electron.dataAPI.processLink(newLink);
      } else if (action === 'change-url-edit') {
        this.dropReference(oldLink);
        this.addLink(newLink);
        window.electron.dataAPI.getReference(newLink);
      }
    }
  };

  onChangeReference = (
    event: IpcRendererEvent,
    link: string,
    action: string,
    status: boolean
  ): void => {
    if (status) {
      if (action === 'editing') {
        window.electron.dataAPI.getReference(link);
      } else if (action === 'update') {
        window.electron.dataAPI.getReference(link);
      } else if (action === 'delete') {
        this.dropReference(link);
      }
    }
  };

  private addLink = (link: string): void => {
    const newLinks = this.state.listOfLinks;
    newLinks.add(link);
    this.setState({ listOfLinks: newLinks });
  };

  requestData = (event: Event, link: string): void => {
    window.electron.dataAPI.getReference(link);
  };

  onUpdateDone = (event: Event, result: boolean, link: string): void => {
    if (result) {
      window.electron.dataAPI.getReference(link);
    }
  };

  private dropReference = (link: string) => {
    const { listReferences } = this.state;
    if (listReferences) {
      const index = listReferences.findIndex((obj) => obj.URL === link);
      if (index != -1) {
        listReferences.splice(index, 1);
      }
    }
    const { listOfLinks } = this.state;
    if (listOfLinks) {
      listOfLinks.delete(link);
    }
    this.setState({ listOfLinks, listReferences });
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
  };

  clearBox = (event: MouseEvent): void => {
    event.preventDefault();
    // This function clean the text box
    this.setState({
      listReferences: undefined,
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

  private getRefText = (refData: ReferenceData): string => {
    if (refData.authorName === refData.authorSurname) {
      return `${refData.authorSurname}. (${refData.yearPublish}). ${refData.title} Retrieved from <${refData.URL}>`;
    } else {
      return `${refData.authorSurname}, ${refData.authorName}. (${refData.yearPublish}). ${refData.title} Retrieved from <${refData.URL}>`;
    }
  };

  private copyClipBoard = (): void => {
    const { listReferences } = this.state;
    let text = '';

    listReferences.forEach((item) => {
      if (item.status === 'ready') {
        text = text + this.getRefText(item) + '\n';
      }
    });

    window.electron.dataAPI.copyClipBoard(text);
  };

  render(): JSX.Element {
    const { listReferences, listOfLinks } = this.state;

    return (
      <main>
        <div className="container">
          <div className="row mg-top-0">
            <img
              className="img-internet"
              src={navigator.onLine ? onLineImg : offLineImg}
              alt="internet-status"
            />
          </div>
          <div className="row">
            <h1 className="title">Auto References</h1>
          </div>
          <div className="row">
            <TextBox setLinksFromTextBox={this.setLinksFromTextBox} />
          </div>
          <div className="row">
            {listOfLinks && listReferences && (
              <ListReference
                links={listOfLinks}
                listReferences={listReferences}
              />
            )}
          </div>
          <div className="row">
            <div className="col s1 offset-s9">
              {listReferences ? (
                <button
                  className="btn-copy btn-floating  green accent-3"
                  onClick={this.copyClipBoard}
                >
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
