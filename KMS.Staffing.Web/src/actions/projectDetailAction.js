import * as actionTypes from './actionTypes';
import projectApi from '../api/projectApi';
import { defaultProjectImage } from '../const';

export function loadProjectDetail(id) {  
    return function(dispatch) {
      return projectApi.getProjectDetail(id).then(projectDetail => {
        if (projectDetail.Image === undefined || projectDetail.Image === '' ) {
          projectDetail.Image = defaultProjectImage;
        }
        dispatch({type: actionTypes.LOAD_PROJECTS_DETAIL, projectDetail});
      }).catch(error => {
        throw(error);
      });
    };
  }
  