import * as apiConfig from './apiConfiguration';

class SkillCategoryApi {
    static getAllSkillCategories() {
        return fetch(apiConfig.API_URL + apiConfig.SKILLCATEGORY_MODULE, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default SkillCategoryApi; 