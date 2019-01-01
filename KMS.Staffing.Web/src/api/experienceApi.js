import * as apiConfig from './apiConfiguration';

class ExperienceApi {
    static getAllExperiences() {
        return fetch(apiConfig.API_URL + apiConfig.EXPERIENCE_MODULE, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default ExperienceApi; 