import 'babel-polyfill';  
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import App from './App'
import 'react-table/react-table.css'
import {loadEmployees} from './actions/employeeActions';
import {loadTitles} from './actions/TitleActions';
import { syncHistoryWithStore} from 'react-router-redux';

const store = configureStore();
store.dispatch(loadEmployees());
store.dispatch(loadTitles());
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)