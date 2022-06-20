/* 
This suit test the data storage functionality of the application.

*/
import DataStorage, { ReferenceData, refStatus } from '../../main/DataStorage';

describe('This suit test the data storage functionality of the application.', () => {
  const dataStorage = DataStorage.getInstance();
  const URL = `https://www.youtube.com/TRUE`;
  let dataExample_1 = {
    id: '',
    title: '',
    authorName: '',
    authorSurname: '',
    visitDate: new Date().getFullYear().toString(),
    yearPublish: '',
    URL: URL,
    status: <refStatus>'searching'
  };
  const URLWrong = `https://www.youtube.com/FALSE`;
  const dataExample_2 = {
    id: '',
    title: '',
    authorName: '',
    authorSurname: '',
    visitDate: new Date().getFullYear().toString(),
    yearPublish: '',
    URL: URLWrong,
    status: <refStatus>'searching'
  };

  test('set Method', () => {
    const response = dataStorage.setData(dataExample_1);
    dataExample_1.id = response.id;
    expect(response).toEqual(dataExample_1);
  });

  test('set method error', () => {
    const response = dataStorage.setData(dataExample_1);
    expect(response).toBeNull();
  });

  test('Get Method', () => {
    const data = dataStorage.getData(dataExample_1.id);
    const expected = {
      id: dataExample_1.id,
      title: '',
      authorName: '',
      authorSurname: '',
      visitDate: new Date().getFullYear().toString(),
      yearPublish: '',
      URL: URL,
      status: 'searching'
    };

    expect(data).toEqual(expected);
  });

  test('Get Method Error', () => {
    const data = dataStorage.getData('asjhdgajshgd');

    expect(data).toBeNull();
  });

  test('Put Data Method', () => {
    const data: ReferenceData = {
      id: dataExample_1.id,
      title: 'Test YouTube',
      authorName: 'title test',
      authorSurname: 'title test',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/TRUE',
      status: 'wrong-data'
    };

    dataExample_1 = dataStorage.putDataID(data);

    expect(dataExample_1).toEqual(data);
  });

  test('Put Data Method Error', () => {
    const data: ReferenceData = {
      id: 'adsda',
      title: 'Test YouTube',
      authorName: 'title test',
      authorSurname: 'title test',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/TRUE',
      status: 'wrong-data'
    };

    const response = dataStorage.putDataID(data);

    expect(response).toBeNull();
  });

  test('Patch Data Method', () => {
    const data = {
      title: 'new title YouTube'
    };

    const response = dataStorage.patchDataID(dataExample_1.id, data);
    dataExample_1.title = 'new title YouTube';
    expect(response).toEqual(dataExample_1);
  });

  test('Remove Method', () => {
    const response = dataStorage.deleteData(dataExample_1.id);

    expect(response).toBeTruthy();
  });

  test('Remove Method Error', () => {
    const link = `https://www.youtube.com/`;

    const response = dataStorage.deleteData(link);

    expect(response).toBeFalsy();
  });
});
