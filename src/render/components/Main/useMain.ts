import { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron/main';
import { ReferenceData } from '../../../main/DataStorage';

//Interfaces

export interface ListReferences {
  [index: string]: ReferenceData;
}

function useMain(): ListReferences {
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

  return listReferences;
}

export default useMain;
