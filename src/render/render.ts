/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 */
declare global {
  interface Window {
    electron: any;
  }
}

// css
import 'materialize-css/dist/css/materialize.css';
import './assets/styles/main.css';

// components
import App from './components/App';
// react
import ReactDOM from 'react-dom';

const container = document.getElementById('app');

ReactDOM.render(App(), container);
