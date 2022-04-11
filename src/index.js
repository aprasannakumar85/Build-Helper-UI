import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'font-awesome/css/font-awesome.min.css';

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 6000,
  // you can also just use 'scale'
  transition: transitions.SCALE    
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);