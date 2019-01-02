import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function titleReducer(state = initialState.titles, action) {  
    switch(action.type) {
      case actionTypes.LOAD_TITLES_SUCCESS:
        return _.concat([], action.titles)       
      default: 
        return state;
    }
  }