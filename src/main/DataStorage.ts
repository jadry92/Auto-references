import crypto from 'crypto';
import fs from 'fs';

interface SchemaDataStorage {
  [index: string]: ReferenceData;
}
type indexRef =
  | 'title'
  | 'authorName'
  | 'authorSurname'
  | 'visitDate'
  | 'yearPublish'
  | 'URL'
  | 'status';
export type refStatus =
  | 'searching'
  | 'ready'
  | 'wrong-data'
  | 'wrong-link'
  | 'editing';

export interface ReferenceData {
  title: string;
  authorName: string;
  authorSurname: string;
  visitDate: string;
  yearPublish: string;
  URL: string;
  status: refStatus;
}

class DataStorage {
  private static instance: DataStorage;
  private path: string;
  private data: SchemaDataStorage;

  private constructor() {
    this.path = './data/DataStorage.json';
    if (fs.existsSync(this.path)) {
      const rawData = fs.readFileSync(this.path);
      this.data = JSON.parse(rawData.toString());
    } else {
      this.data = {};
    }
  }

  private generateID = (link: string): string => {
    return crypto.createHash('md5').update(link).digest('hex');
  };

  public static getInstance(): DataStorage {
    if (!DataStorage.instance) {
      DataStorage.instance = new DataStorage();
    }
    return DataStorage.instance;
  }

  public save = (): string => {
    const dataString = JSON.stringify(this.data, null, 2);
    fs.writeFile(this.path, dataString, (error) => {
      if (error) throw error;
    });
    return 'Save';
  };

  public getData = (link: string): ReferenceData => {
    const index = this.generateID(link);
    if (Object.keys(this.data).includes(index)) {
      return this.data[index];
    } else {
      return null;
    }
  };

  public setData = (link: string, refData: ReferenceData): boolean => {
    const index = this.generateID(link);
    if (Object.keys(this.data).includes(index)) {
      Object.keys(this.data[index]).map(
        (key) =>
          this.data[index][<indexRef>key] != refData[<indexRef>key] &&
          (this.data[index][<indexRef>key] = <refStatus>refData[<indexRef>key])
      );
      return true;
    } else {
      return false;
    }
  };

  public enableEditing = (link: string): boolean => {
    const index = this.generateID(link);
    if (Object.keys(this.data).includes(index)) {
      this.data[index].status = 'editing';
      return true;
    } else {
      return false;
    }
  };

  public create = (link: string): boolean => {
    const index = this.generateID(link);
    if (!Object.keys(this.data).includes(index)) {
      this.data[index] = {
        title: '',
        authorName: '',
        authorSurname: '',
        visitDate: new Date().getFullYear().toString(),
        yearPublish: '',
        URL: link,
        status: 'searching'
      };
      return true;
    } else {
      return false;
    }
  };

  public changeUrlAndSearch = (oldLink: string, newLink: string): boolean => {
    const oldIndex = this.generateID(oldLink);
    const newIndex = this.generateID(newLink);
    if (
      Object.keys(this.data).includes(oldIndex) &&
      !Object.keys(this.data).includes(newIndex)
    ) {
      const refData = this.data[oldIndex];
      delete this.data[oldIndex];
      refData.URL = newLink;
      refData.status = 'searching';
      this.data[newIndex] = refData;
      return true;
    } else {
      return false;
    }
  };

  public changeUrlAndEdit = (oldLink: string, newLink: string): boolean => {
    const oldIndex = this.generateID(oldLink);
    const newIndex = this.generateID(newLink);
    if (
      Object.keys(this.data).includes(oldIndex) &&
      !Object.keys(this.data).includes(newIndex)
    ) {
      const refData = this.data[oldIndex];
      delete this.data[oldIndex];
      refData.URL = newLink;
      refData.status = 'editing';
      this.data[newIndex] = refData;
      return true;
    } else {
      return false;
    }
  };

  public remove = (link: string): boolean => {
    const index = this.generateID(link);
    if (Object.keys(this.data).includes(index)) {
      delete this.data[index];
      return true;
    } else {
      return false;
    }
  };
}

export default DataStorage;
