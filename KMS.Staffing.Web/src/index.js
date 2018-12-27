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
import {loadProjects} from './actions/ProjectActions';
import { createBrowserHistory } from 'history';

const store = configureStore();
store.dispatch(loadEmployees());
store.dispatch(loadTitles());
store.dispatch(loadProjects());

const history = createBrowserHistory();
render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)