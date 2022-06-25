/**
 Author: Johan Suarez Largo
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

export interface ListReferences {
  [index: string]: ReferenceData;
}

// Components

function Main(): JSX.Element {
  const [listReferences, setListReferences] = useState<ListReferences>({});

  const addReference = (event: IpcRendererEvent, reference: ReferenceData) => {
    setListReferences((prevList) => {
      const newList = { ...prevList };
      newList[reference.id] = reference;
      return newList;
    });
  };

  const dropReference = (id: string) => {
    setListReferences((prevList) => {
      const newList = { ...prevList };
      delete newList[id];
      return newList;
    });
  };

  const onChangeReference = (
    event: IpcRendererEvent,
    action: string,
    id: string,
    result: ReferenceData | boolean
  ): void => {
    if (result) {
      if (action === 'update') {
        window.electron.dataAPI.getReference(id);
      } else if (action === 'delete') {
        dropReference(id);
      } else if (action === 'partial-update') {
        window.electron.dataAPI.getReference(id);
      }
    }
  };

  useEffect(() => {
    // ICP communication
    window.electron.onEventsAPI.onProcessURLReady(addReference);
    window.electron.onEventsAPI.onReferenceReady(addReference);
    window.electron.onEventsAPI.onChangeReference(onChangeReference);
  }, []);

  const copyClipBoard = (): void => {
    let text = '';
    for (const index in listReferences) {
      if (listReferences[index].status === 'ready') {
        text = text + getRefText(listReferences[index]) + '\n';
      }
    }
    window.electron.dataAPI.copyClipBoard(text);
  };

  const getRefText = (reference: ReferenceData): string => {
    if (reference.authorName === reference.authorSurname) {
      return `${reference.authorSurname}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
    } else {
      return `${reference.authorSurname}, ${reference.authorName}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
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
