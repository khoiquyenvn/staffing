import competentLevelApi from '../api/competentLevelApi';
import * as actionTypes from './actionTypes';

export function loadCompetentLevels() {  
    return function(dispatch) {
      return competentLevelApi.getAllCompetentLevels().then(competentLevels => {
        dispatch(loadCompetentLevelsSuccess(competentLevels));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadCompetentLevelsSuccess(competentLevels) {  
    return {type: actionTypes.LOAD_COMPETENTLEVELS_SUCCESS, competentLevels};
  }
