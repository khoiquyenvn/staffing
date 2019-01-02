import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function experienceReducer(state = initialState.experiences, action) {  
    switch(action.type) {
      case actionTypes.LOAD_EXPERIENCES_SUCCESS:
        return _.concat([], action.experiences)       
      default: 
        return state;
    }
  }