import * as actionTypes from './actionTypes';
import projectApi from '../api/projectApi';
import { history } from '../index';

export function loadProjects() {  
    return function(dispatch) {
      return projectApi.getAllProjects().then(projects => {
        dispatch({type: actionTypes.LOAD_PROJECTS_SUCCESS, projects});
      }).catch(error => {
        throw(error);
      });
    };
  }
  
export function enterProjectDetail(id) {  
  return function(dispatch) {
    //return history.push('/employeeList');
  };
}

export function loadProjectDetail(id) {  
  return function(dispatch) {
    return projectApi.loadProjectDetail(id).then(project => {
      dispatch(loadProjectDetail(project));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadProjectDetailSuccess(projectDetail) {  
  return {type: actionTypes.LOAD_PROJECTS_DETAIL, projectDetail};
}