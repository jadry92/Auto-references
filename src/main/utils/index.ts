import dns from 'dns';

function testInternetConnection(): Promise<boolean> {
  return dns.promises
    .lookup('google.com')
    .then(() => true)
    .catch(() => false);
}

export { testInternetConnection };
