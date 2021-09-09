/* 
This suit test the data storage functionality of the application.

*/
import DataStorage, { ReferenceData } from '../../main/DataStorage';

describe('This suit test the data storage functionality of the application.', () => {
  const dataStorage = DataStorage.getInstance();

  test('create Method', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;

    const response = dataStorage.create(link);

    expect(response).toBeTruthy();
  });

  test('create method error', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;

    const response = dataStorage.create(link);

    expect(response).toBeFalsy();
  });

  test('Get Method', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;
    const data = dataStorage.getData(link);
    const expected = {
      title: '',
      authorName: '',
      authorSurname: '',
      visitDate: new Date().getFullYear().toString(),
      yearPublish: '',
      URL: link,
      status: 'searching'
    };

    expect(data).toEqual(expected);
  });

  test('Get Method Error', () => {
    const link = `https://www.youtube.com/`;
    const data = dataStorage.getData(link);
    const expected: ReferenceData = null;
    expect(data).toEqual(expected);
  });

  test('setData Method', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;
    const data: ReferenceData = {
      title: 'Dejo YouTube',
      authorName: 'Date un Vlog',
      authorSurname: 'Date un Vlog',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/watch?v=2tUu_zRhPMg',
      status: 'ready'
    };

    const response = dataStorage.setData(link, data);

    expect(response).toBeTruthy();
  });

  test('setData Method Error', () => {
    const link = `https://www.youtube.com/`;
    const data: ReferenceData = {
      title: 'Dejo YouTube',
      authorName: 'Date un Vlog',
      authorSurname: 'Date un Vlog',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/',
      status: 'ready'
    };

    const response = dataStorage.setData(link, data);

    expect(response).toBeFalsy();
  });

  test('Update Functionality with the set Method', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;
    const data: ReferenceData = {
      title: 'Dejo YouTube',
      authorName: 'Date un Vlog',
      authorSurname: 'new surname',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/watch?v=2tUu_zRhPMg',
      status: 'ready'
    };

    const response = dataStorage.setData(link, data);

    expect(response).toBeTruthy();

    const dataResponse = dataStorage.getData(link);

    expect(dataResponse).toEqual(data);
  });

  test('Remove Method', () => {
    const link = `https://www.youtube.com/watch?v=2tUu_zRhPMg`;

    const response = dataStorage.remove(link);

    expect(response).toBeTruthy();
  });

  test('Remove Method Error', () => {
    const link = `https://www.youtube.com/`;

    const response = dataStorage.remove(link);

    expect(response).toBeFalsy();
  });
});
