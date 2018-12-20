import { combineReducers} from 'redux';
import {reducer as burgerMenu} from 'redux-burger-menu';
import employees from './employeeReducer';

const reducers = {
  // Your other reducers go here
  employees,
  burgerMenu // Must be mounted at 'burgerMenu'
};

export default combineReducers(reducers);