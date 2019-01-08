import skillApi from '../api/skillApi';
import * as actionTypes from './actionTypes';

export function loadSkills() {  
    return function(dispatch) {
      return skillApi.getAllSkills().then(skills => {
        dispatch(loadSkillSuccess(skills));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadSkillSuccess(skills) {  
    return {type: actionTypes.LOAD_SKILLS_SUCCESS, skills};
  }
