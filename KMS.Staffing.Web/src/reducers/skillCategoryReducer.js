import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function skillCategoryReducer(state = initialState.skillCategories, action) {  
    switch(action.type) {
      case actionTypes.LOAD_SKILLCATEGORIES_SUCCESS:
        return _.concat([], action.skillCategories)       
      default: 
        return state;
    }
  }