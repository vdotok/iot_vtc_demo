import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Store , persistor} from "./Store/Store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
