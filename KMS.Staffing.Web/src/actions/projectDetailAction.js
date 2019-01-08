import * as actionTypes from './actionTypes';
import projectApi from '../api/projectApi';
import { history } from '../index';

export function loadProjectDetail(id) {  
    return function(dispatch) {
      return projectApi.getProjectDetail(id).then(projectDetail => {
        dispatch({type: actionTypes.LOAD_PROJECTS_DETAIL, projectDetail});
      }).catch(error => {
        throw(error);
      });
    };
  }
  
export function loadMemberList(id) {  
    return function(dispatch) {
      return projectApi.loadMemberList(id).then(memberList => {
        dispatch({type: actionTypes.LOAD_MEMBER_LIST, memberList});
      }).catch(error => {
        throw(error);
      });
    };
  }
  
export function loadSessionPlanList(id) {  
  return function(dispatch) {
    return projectApi.loadSessionPlanList(id).then(sessionPlanList => {
      dispatch({type: actionTypes.LOAD_SESSON_PLAN_LIST, sessionPlanList});
    }).catch(error => {
      throw(error);
    });
  };
}

export function enterSessionPlanDetail(projectId, sessionId) {  
  return function(dispatch) {
    return history.push('/sessionplan/' + sessionId);
  };
}