import * as apiConfig from './apiConfiguration';

class SkillApi {
    static getAllSkills() {
        return fetch(apiConfig.API_URL + apiConfig.SKILL_MODULE, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default SkillApi; 