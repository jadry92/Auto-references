/* 
This suit test the data storage functionality of the application.

*/
import DataStorage, { ReferenceData } from '../../main/DataStorage';

describe.skip('This suit test the data storage functionality of the application.', () => {
  const dataStorage = DataStorage.getInstance();
  const link = `https://www.youtube.com/TRUE`;
  const linkWrong = `https://www.youtube.com/FALSE`;

  test('create Method', () => {
    const response = dataStorage.create(link);

    expect(response).toBeTruthy();
  });

  test('create method error', () => {
    const response = dataStorage.create(link);

    expect(response).toBeFalsy();
  });

  test('Get Method', () => {
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
    const data = dataStorage.getData(linkWrong);
    const expected: ReferenceData = null;
    expect(data).toEqual(expected);
  });

  test('setData Method', () => {
    const data: ReferenceData = {
      title: 'Test YouTube',
      authorName: 'title test',
      authorSurname: 'title test',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/TRUE',
      status: 'wrong-data'
    };

    const response = dataStorage.setData(link, data);

    expect(response).toBeTruthy();
  });

  test('setData Method Error', () => {
    const data: ReferenceData = {
      title: 'Test YouTube',
      authorName: 'title test',
      authorSurname: 'title test',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/TRUE',
      status: 'wrong-data'
    };

    const response = dataStorage.setData(linkWrong, data);

    expect(response).toBeFalsy();
  });

  test.todo('enable editing');

  test('Update Functionality with the set Method', () => {
    const data: ReferenceData = {
      title: 'Test YouTube',
      authorName: 'name',
      authorSurname: 'surname',
      visitDate: '2021',
      yearPublish: '2021',
      URL: 'https://www.youtube.com/TRUE',
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
