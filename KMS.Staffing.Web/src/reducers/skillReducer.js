import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function skillReducer(state = initialState.skills, action) {  
    switch(action.type) {
      case actionTypes.LOAD_SKILLS_SUCCESS:
        return _.concat([], action.skills)       
      default: 
        return state;
    }
  }