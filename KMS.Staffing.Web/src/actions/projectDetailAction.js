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
  