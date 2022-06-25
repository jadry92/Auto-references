import dns from 'dns';
import { ReferenceData, refStatus } from '../DataStorage';

function testInternetConnection(): Promise<boolean> {
  return dns.promises
    .lookup('google.com')
    .then(() => true)
    .catch(() => false);
}

const yearRegex = /\d\d\d\d/g;
function validInformation(data: ReferenceData): refStatus {
  if (!data.yearPublish.match(yearRegex)) {
    return 'wrong-data';
  } else if (data.authorName === '' || data.authorSurname === '') {
    return 'wrong-data';
  } else if (data.title === '') {
    return 'wrong-data';
  } else {
    return 'ready';
  }
}

export { testInternetConnection, validInformation };
