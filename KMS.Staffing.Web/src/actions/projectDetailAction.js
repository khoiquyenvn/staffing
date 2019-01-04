import * as actionTypes from './actionTypes';
import projectApi from '../api/projectApi';

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
  