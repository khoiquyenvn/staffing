import skillCategoryApi from '../api/skillCategoryApi';
import * as actionTypes from './actionTypes';

export function loadSkillCategories() {  
    return function(dispatch) {
      return skillCategoryApi.getAllSkillCategories().then(cats => {
        dispatch(loadSkillCategoriesSuccess(cats));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadSkillCategoriesSuccess(skillCategories) {  
    return {type: actionTypes.LOAD_SKILLCATEGORIES_SUCCESS, skillCategories};
  }
