import crypto from 'crypto';
import fs from 'fs';

interface SchemaDataStorage {
  [index: string]: ReferenceData;
}

export type refStatus =
  | 'searching'
  | 'ready'
  | 'wrong-data'
  | 'wrong-link'
  | 'editing';

export interface ReferenceData {
  id: string;
  title: string;
  authorName: string;
  authorSurname: string;
  visitDate: string;
  yearPublish: string;
  URL: string;
  status: refStatus;
}

class DataStorage {
  private static db: DataStorage;
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

  private generateID = (): string => {
    let uuid = crypto.randomBytes(32).toString('hex');
    while (Object.keys(this.data).includes(uuid)) {
      uuid = crypto.randomBytes(32).toString('hex');
    }
    return uuid;
  };

  public static getInstance(): DataStorage {
    if (!DataStorage.db) {
      DataStorage.db = new DataStorage();
    }
    return DataStorage.db;
  }

  public save = (): string => {
    const dataString = JSON.stringify(this.data, null, 2);
    fs.writeFile(this.path, dataString, (error) => {
      if (error) throw error;
    });
    return 'Save';
  };

  public getData = (id: string): ReferenceData => {
    if (Object.keys(this.data).includes(id)) {
      return this.data[id];
    } else {
      return null;
    }
  };

  public putDataID = (reference: ReferenceData): ReferenceData => {
    if (Object.keys(this.data).includes(reference.id)) {
      this.data[reference.id] = reference;
      return this.data[reference.id];
    }
    return null;
  };

  public patchDataID = (
    id: string,
    data: Partial<ReferenceData>
  ): ReferenceData => {
    if (Object.keys(this.data).includes(id)) {
      Object.keys(data).forEach((key) => {
        this.data[id][<keyof ReferenceData>key] = <refStatus>(
          data[<keyof ReferenceData>key]
        );
      });
      return this.data[id];
    }
    return null;
  };

  public setData = (reference: ReferenceData): ReferenceData => {
    if (reference.id === '') {
      const id = this.generateID();
      this.data[id] = { ...reference, id: id };
      return this.data[id];
    }
    return null;
  };

  public deleteData = (id: string): boolean => {
    if (Object.keys(this.data).includes(id)) {
      delete this.data[id];
      return true;
    } else {
      return false;
    }
  };

  public getAll = (): ReferenceData[] => {
    return Object.values(this.data);
  };
}

export default DataStorage;
