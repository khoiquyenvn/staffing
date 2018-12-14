import { combineReducers} from 'redux';
import {reducer as burgerMenu} from 'redux-burger-menu';

const reducers = {
  // Your other reducers go here
  burgerMenu // Must be mounted at 'burgerMenu'
};

export default combineReducers(reducers);