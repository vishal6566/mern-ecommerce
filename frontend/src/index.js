import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {Provider} from "react-redux";
import store from './store';
//for showing alert
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic"
const root = ReactDOM.createRoot(document.getElementById('root'));


const options={
  timeout:5000,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}

root.render(
  <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options}>
  <BrowserRouter >
    <App />
  </BrowserRouter >
  </AlertProvider>
  </Provider>
);


