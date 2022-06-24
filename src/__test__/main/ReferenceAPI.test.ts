/**
 * This suit test the reference class:
 * The reference class handel the ICP main
 * events related with the logic of the App.
 *
 * ToDo: fix the mock error in TS and jest
 */
import ReferenceAPI from '../../main/ReferenceAPI';
import { ipcMain } from 'electron';

jest.mock(
  'electron',
  () => {
    const mockIpcMain = {
      on: jest.fn().mockReturnThis()
    };
    return { ipcMain: mockIpcMain };
  },
  { virtual: true }
);

describe.skip('This suit test the reference class', () => {
  let APIinst;
  beforeEach(() => {
    APIinst = new ReferenceAPI();
  });

  test('Test Process URL API ', () => {
    //expect(ipcMain.on.mock.calls[0][0]).toEqual('get-reference');
  });
});
