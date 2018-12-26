import titleApi from '../api/titleApi';
import * as actionTypes from './actionTypes';

export function loadTitles() {  
    return function(dispatch) {
      return titleApi.getAllTitles().then(titles => {
        dispatch(loadTitlesSuccess(titles));
      }).catch(error => {
        throw(error);
      });
    };
  }

export function loadTitlesSuccess(titles) {  
    return {type: actionTypes.LOAD_TITLES_SUCCESS, titles};
  }
