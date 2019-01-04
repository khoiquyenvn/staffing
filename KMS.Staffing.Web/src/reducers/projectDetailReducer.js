import * as actionTypes from '../actions/actionTypes';  
import initialState from './initialState';
import _ from 'lodash/fp';

export default function projectDetailReducer(state = initialState.projectDetail, action) {  
    switch(action.type) {
      case actionTypes.LOAD_PROJECTS_DETAIL:
        return Object.assign({}, state, action.projectDetail);
      case actionTypes.LOAD_MEMBER_LIST:
      return { ...state, Member: action.memberList }   
      default:
        return state;
    }
  }