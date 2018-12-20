import 'babel-polyfill';  
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './App'
import {loadEmployees} from './actions/employeeActions';

const store = configureStore();
store.dispatch(loadEmployees());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)