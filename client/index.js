import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import configureStore from './configureStore';

const store = configureStore();

const container = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, container);