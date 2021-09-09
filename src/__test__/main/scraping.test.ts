/*

This suit testing the scraping functionality of the application

*/

import scrapingLink from '../../main/Scraping';

describe('This suit test the Scraping Functions', () => {
  it('testing scraping YouTube link', async () => {
    const link = 'https://www.youtube.com/watch?v=2tUu_zRhPMg';
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
  });

  it('testing scraping Wikipedia link', async () => {
    const link = 'https://en.wikipedia.org/wiki/Internet';
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
  });

  it('testing scraping General link', async () => {
    const link = 'https://lucybain.com/blog/2017/react-js-when-to-rerender/';
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
  });

  it('testing scraping Wrong link', async () => {
    const link =
      'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf';
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
  });

  it('testing scraping Broke link', async () => {
    const link = 'https://www.flase-domaion.com';
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
  });
});
