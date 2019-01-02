import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function projectReducer(state = initialState.projects, action) {  
    switch(action.type) {
      case actionTypes.LOAD_PROJECTS_SUCCESS:
        return _.concat([], action.projects)      
      case actionTypes.LOAD_PROJECTS_DETAIL: 
          return action.projectDetail     
      default:
        return state;
    }
  }