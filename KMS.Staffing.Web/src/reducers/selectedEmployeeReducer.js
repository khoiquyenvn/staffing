import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function selectedEmployeeReducer(state = initialState.selectedEmployee, action) {  
    switch(action.type) {
      case actionTypes.LOAD_EMPLOYEE_BY_ID_SUCCESS:
        return Object.assign({}, state, action.selectedEmployee)
      default: 
        return state;
    }
  }