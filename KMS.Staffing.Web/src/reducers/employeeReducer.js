import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function employeeReducer(state = initialState.employees, action) {  
    switch(action.type) {
      case actionTypes.LOAD_EMPLOYEES_SUCCESS:
        return _.concat([], action.employees)      
      default: 
        return state;
    }
  }