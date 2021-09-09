/*
This is a functional test for the Auto Reference App

TODO: Implement spectrum to test the full APP

*/

import { Application } from 'spectron';
import path from 'path';
import electron, { app } from 'electron';

async function delay(seconds: number) {
  return setTimeout(() => 'done', seconds * 1000);
}

describe.skip('This is a functional test for the Auto Reference App', () => {
  const pathApp = electron;
  const baseDir = path.join(__dirname, '../..');
  let autoReferenceApp: Application;

  beforeAll(async () => {
    autoReferenceApp = new Application({
      path: '/Users/johan/Documents/Projects/AutoRef/out/auto-ref-darwin-x64/auto-ref.app/Contents/MacOS/auto-ref'
    });
    await autoReferenceApp.start();
    //jest.setTimeout(5000);
  }, 20000);

  afterAll(async () => await autoReferenceApp.stop(), 20000);

  test('stat of the app', async () => {
    const count = await autoReferenceApp.client.getWindowCount();
    expect(count).toEqual(1);
  });
  test('scraping functionality', async () => {
    const links = `https://www.flase-domaion.com
    https://lucybain.com/blog/2017/react-js-when-to-rerender/
    https://www.youtube.com/watch?v=2tUu_zRhPMg
    https://en.wikipedia.org/wiki/Internet
    https://www.accc.gov.au/system/files/20-47RPT_Communications_Market_Report_FA.pdf
    `;
    const textBox = await autoReferenceApp.client.$('#url');
    textBox.addValue(links);
    const summitBtn = await autoReferenceApp.client.$('#scrapping');
    await summitBtn.click();
  });
});
