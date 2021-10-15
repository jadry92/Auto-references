/*

This suit testing the scraping functionality of the application

*/
import dns from 'dns';
import scrapingLink from '../../main/Scraping';
import { ReferenceData } from '../../main/DataStorage';

function isInternetConnection() {
  return dns.promises
    .lookup('google.com')
    .then(() => true)
    .catch(() => false);
}

describe('This suit test the Scraping Functions', () => {
  let dataNoConnection: ReferenceData;
  let isThereInternet: boolean;
  beforeAll(async () => {
    isThereInternet = await isInternetConnection();
  });

  beforeEach(() => {
    dataNoConnection = {
      title: 'Non internet connection',
      authorName: '',
      authorSurname: '',
      visitDate: '',
      yearPublish: '',
      URL: '',
      status: 'wrong-data'
    };
  });

  it('testing scraping YouTube link', async () => {
    const link = 'https://www.youtube.com/watch?v=2tUu_zRhPMg';
    if (isThereInternet) {
      const response = await scrapingLink(link);
      const expected = {
        title: 'Dejo YouTube',
        authorName: 'Date un Vlog',
        authorSurname: 'Date un Vlog',
        visitDate: '2021',
        yearPublish: '2021',
        URL: 'https://www.youtube.com/watch?v=2tUu_zRhPMg',
        status: 'ready'
      };
      expect(response).toEqual(expected);
    } else {
      const response = await scrapingLink(link);
      dataNoConnection.URL = link;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Wikipedia link', async () => {
    const link = 'https://en.wikipedia.org/wiki/Internet';
    if (isThereInternet) {
      const response = await scrapingLink(link);
      const expected = {
        title: 'Internet',
        authorName: 'wikipedia',
        authorSurname: 'wikipedia',
        visitDate: '2021',
        yearPublish: '2021',
        URL: 'https://en.wikipedia.org/wiki/Internet',
        status: 'ready'
      };
      expect(response).toEqual(expected);
    } else {
      const response = await scrapingLink(link);
      dataNoConnection.URL = link;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping General link', async () => {
    const link = 'https://lucybain.com/blog/2017/react-js-when-to-rerender/';
    if (isThereInternet) {
      const response = await scrapingLink(link);
      const expected = {
        title: 'Lucy | How does React decide to re-render a component?',
        authorName: '',
        authorSurname: '',
        visitDate: '2021',
        yearPublish: '',
        URL: 'https://lucybain.com/blog/2017/react-js-when-to-rerender/',
        status: 'wrong-data'
      };
      expect(response).toEqual(expected);
    } else {
      const response = await scrapingLink(link);
      dataNoConnection.URL = link;
      //expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Wrong link', async () => {
    const link =
      'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf';
    if (isThereInternet) {
      const response = await scrapingLink(link);
      const expected = {
        title: 'Wrong link',
        authorName: '',
        authorSurname: '',
        visitDate: '2021',
        yearPublish: '',
        URL: 'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf',
        status: 'wrong-link'
      };
      expect(response).toEqual(expected);
    } else {
      const response = await scrapingLink(link);
      dataNoConnection.URL = link;
      expect(response).toEqual(dataNoConnection);
    }
  });

  it('testing scraping Broke link', async () => {
    const link = 'https://www.flase-domaion.com';
    if (isThereInternet) {
      const response = await scrapingLink(link);
      const expected = {
        title: '',
        authorName: '',
        authorSurname: '',
        visitDate: '2021',
        yearPublish: '',
        URL: 'https://www.flase-domaion.com',
        status: 'wrong-link'
      };
      expect(response).toEqual(expected);
    } else {
      const response = await scrapingLink(link);
      dataNoConnection.URL = link;
      expect(response).toEqual(dataNoConnection);
    }
  });
});
