import * as apiConfig from './apiConfiguration';

class TitleApi {
    static getAllTitles() {
        return fetch(apiConfig.API_URL + apiConfig.TITLE_MODULE, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default TitleApi; 