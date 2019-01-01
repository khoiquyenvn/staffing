import * as apiConfig from './apiConfiguration';

class CompetentLevelApi {
    static getAllCompetentLevels() {
        return fetch(apiConfig.API_URL + apiConfig.COMPETENTLEVEL_MODULE, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default CompetentLevelApi; 