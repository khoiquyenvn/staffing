import { combineReducers} from 'redux';
import {reducer as burgerMenu} from 'redux-burger-menu';

import { routerReducer } from 'react-router-redux'
import employees from './employeeReducer';
import projects from './projectReducer';
import titles from './titleReducer';

const reducers = {
  // Your other reducers go here
  employees,
  titles,
  projects,
  burgerMenu, // Must be mounted at 'burgerMenu'
  routing: routerReducer
};

export default combineReducers(reducers);