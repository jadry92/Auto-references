export const dataMock = [
  {
    title: 'Dejo YouTube',
    authorName: 'Date un Vlog',
    authorSurname: 'Date un Vlog',
    visitDate: '2021',
    yearPublish: '2021',
    URL: 'https://www.youtube.com/watch?v=2tUu_zRhPMg',
    status: 'ready'
  },
  {
    title: 'Internet',
    authorName: 'wikipedia',
    authorSurname: 'wikipedia',
    visitDate: '2021',
    yearPublish: '2021',
    URL: 'https://en.wikipedia.org/wiki/Internet',
    status: 'ready'
  },
  {
    title: 'Lucy | How does React decide to re-render a component?',
    authorName: '',
    authorSurname: '',
    visitDate: '2021',
    yearPublish: '',
    URL: 'https://lucybain.com/blog/2017/react-js-when-to-rerender/',
    status: 'wrong-data'
  },
  {
    title: 'Wrong link',
    authorName: '',
    authorSurname: '',
    visitDate: '2021',
    yearPublish: '',
    URL: 'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf',
    status: 'wrong-link'
  },
  {
    title: '',
    authorName: '',
    authorSurname: '',
    visitDate: '2021',
    yearPublish: '',
    URL: 'https://www.flase-domaion.com',
    status: 'wrong-link'
  }
];
export const linksMock = new Set([
  'https://www.youtube.com/watch?v=2tUu_zRhPMg',
  'https://en.wikipedia.org/wiki/Internet',
  'https://lucybain.com/blog/2017/react-js-when-to-rerender/',
  'https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf',
  'https://www.flase-domaion.com'
]);
