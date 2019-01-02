import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function competentLevelReducer(state = initialState.competentLevels, action) {  
    switch(action.type) {
      case actionTypes.LOAD_COMPETENTLEVELS_SUCCESS:
        return _.concat([], action.competentLevels)       
      default: 
        return state;
    }
  }