/*

This suit testing the scraping functionality of the application

*/
import dns from 'dns';
import ScrapingData from '../../main/ScrapingData';

function isInternetConnection() {
  return dns.promises
    .lookup('google.com')
    .then(() => true)
    .catch(() => false);
}

describe('This suit test the Scraping class', () => {
  const dataNoConnection = {
    id: '',
    title: '',
    authorName: '',
    authorSurname: '',
    visitDate: '2021',
    yearPublish: '',
    URL: 'https://www.flase-domaion.com',
    status: 'wrong-link'
  };
  let isThereInternet: boolean;
  beforeAll(async () => {
    isThereInternet = await isInternetConnection();
  });

  it('testing scraping YouTube link', async () => {
    const URL = 'https://www.youtube.com/watch?v=2tUu_zRhPMg';
    if (isThereInternet) {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      const expected = {
        id: '',
        title: 'Dejo YouTube',
        authorName: 'Date Un Vlog',
        authorSurname: 'Date Un Vlog',
        visitDate: '2022',
        yearPublish: '2021',
        URL: 'https://www.youtube.com/watch?v=2tUu_zRhPMg',
        status: 'ready'
      };
      expect(response).toEqual(expected);
    } else {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      dataNoConnection.URL = URL;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Wikipedia link', async () => {
    const URL = 'https://en.wikipedia.org/wiki/Internet';
    if (isThereInternet) {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      const expected = {
        id: '',
        title: 'Internet',
        authorName: 'wikipedia',
        authorSurname: 'wikipedia',
        visitDate: '2022',
        yearPublish: '2022',
        URL: 'https://en.wikipedia.org/wiki/Internet',
        status: 'ready'
      };
      expect(response).toEqual(expected);
    } else {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      dataNoConnection.URL = URL;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping General link', async () => {
    const URL = 'https://lucybain.com/blog/2017/react-js-when-to-rerender/';
    if (isThereInternet) {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      const expected = {
        id: '',
        title: 'Lucy | How does React decide to re-render a component?',
        authorName: '',
        authorSurname: '',
        visitDate: '2022',
        yearPublish: '',
        URL: 'https://lucybain.com/blog/2017/react-js-when-to-rerender/',
        status: 'wrong-data'
      };
      expect(response).toEqual(expected);
    } else {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      dataNoConnection.URL = URL;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Wrong link', async () => {
    const URL =
      'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf';
    if (isThereInternet) {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      const expected = {
        id: '',
        title: '',
        authorName: '',
        authorSurname: '',
        visitDate: '',
        yearPublish: '',
        URL: 'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf',
        status: 'wrong-link'
      };
      expect(response).toEqual(expected);
    } else {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      dataNoConnection.URL = URL;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Broke link', async () => {
    const URL = 'https://www.flase-domaion.com';
    if (isThereInternet) {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      const expected = {
        id: '',
        title: '',
        authorName: '',
        authorSurname: '',
        visitDate: '',
        yearPublish: '',
        URL: 'https://www.flase-domaion.com',
        status: 'wrong-link'
      };
      expect(response).toEqual(expected);
    } else {
      const dataScraped = new ScrapingData(URL);
      const response = await dataScraped.parsingReference();
      dataNoConnection.URL = URL;
      expect(response).toEqual(dataNoConnection);
    }
  });
});
