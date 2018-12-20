import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';

export default function employeeReducer(state = initialState.employees, action) {  
    switch(action.type) {
      case actionTypes.LOAD_EMPLOYEES_SUCCESS:
        return Object.assign({}, state, action.employees)        
      default: 
        return state;
    }
  }