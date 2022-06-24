/**
 Author: Johan Suarez
 */
// react
import React, { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron/main';
import ListReference from '../ListReference';
import TextBox from '../TextBox';
import { ReferenceData } from '../../../main/DataStorage';
import copyImg from '../../assets/img/content_copy_black_24dp.svg';
import offLineImg from '../../assets/img/cloud_off_black_24dp.svg';
import onLineImg from '../../assets/img/cloud_done_black_24dp.svg';

//Interfaces

interface IProps {}// eslint-disable-line

interface IState {
  listOfLinks?: Set<string>;
  listReferences?: [ReferenceData];
}

// Components
class OlMain extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      listOfLinks: undefined,
      listReferences: undefined
    };
  }

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
}

function Main(): JSX.Element {
  const [listReferences, setListReferences] = useState<ReferenceData[]>();

  const addReference = (event: IpcRendererEvent, refData: ReferenceData) => {
    const allReferences = [...listReferences];
    allReferences.push(refData);
    console.log(refData, 'here');
    setListReferences(allReferences);
  };
  // ICP communication

  window.electron.onEventsAPI.onProcessURLReady(addReference);
  window.electron.onEventsAPI.onReferenceReady(
    (event: IpcRendererEvent, data: string) => {
      console.log(`a msg from the back ${data}`);
    }
  );

  const copyClipBoard = (): void => {
    let text = '';
    listReferences.forEach((item) => {
      if (item.status === 'ready') {
        text = text + getRefText(item) + '\n';
      }
    });

    window.electron.dataAPI.copyClipBoard(text);
  };

  const getRefText = (refData: ReferenceData): string => {
    if (refData.authorName === refData.authorSurname) {
      return `${refData.authorSurname}. (${refData.yearPublish}). ${refData.title} Retrieved from <${refData.URL}>`;
    } else {
      return `${refData.authorSurname}, ${refData.authorName}. (${refData.yearPublish}). ${refData.title} Retrieved from <${refData.URL}>`;
    }
  };

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
          <TextBox />
        </div>
        <div className="row">
          {listReferences && <ListReference listReferences={listReferences} />}
        </div>
        <div className="row">
          <div className="col s1 offset-s9">
            {listReferences ? (
              <button
                className="btn-copy btn-floating  green accent-3"
                onClick={copyClipBoard}
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
export default Main;

/*
https://www.flase-domaion.com
https://lucybain.com/blog/2017/react-js-when-to-rerender/
https://www.youtube.com/watch?v=2tUu_zRhPMg
https://en.wikipedia.org/wiki/Internet
https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf
*/
