import * as actionTypes from './actionTypes';
import projectApi from '../api/projectApi';

export function loadProjects() {  
    return function(dispatch) {
      return projectApi.getAllProjects().then(projects => {
        dispatch(loadProjectSuccess(projects));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadProjectSuccess(projects) {  
    return {type: actionTypes.LOAD_PROJECTS_SUCCESS, projects};
  }
