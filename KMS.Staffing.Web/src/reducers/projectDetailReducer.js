import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function projectDetailReducer(state = initialState.projectDetail, action) {  
    switch(action.type) {
      case actionTypes.LOAD_PROJECTS_DETAIL:
        return Object.assign({}, state, action.projectDetail)      
      default:
        return state;
    }
  }