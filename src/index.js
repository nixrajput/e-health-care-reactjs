import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { firebaseConfig } from './firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
