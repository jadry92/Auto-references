/**

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
