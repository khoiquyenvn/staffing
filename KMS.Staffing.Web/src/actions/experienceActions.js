import experienceApi from '../api/experienceApi';
import * as actionTypes from './actionTypes';

export function loadExperiences() {  
    return function(dispatch) {
      return experienceApi.getAllExperiences().then(exps => {
        dispatch(loadExperiencesSuccess(exps));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadExperiencesSuccess(experiences) {  
    return {type: actionTypes.LOAD_EXPERIENCES_SUCCESS, experiences};
  }
