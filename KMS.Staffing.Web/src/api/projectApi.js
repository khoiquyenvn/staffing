import * as apiConfig from './apiConfiguration';

class ProjectApi {  
    static getAllProjects() {
      return fetch(apiConfig.API_URL + apiConfig.PROJECT_MODULE, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static getProjectDetail(id) {
      return fetch(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/' + id, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static loadMemberList(id) {
      return fetch(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/getMemberList/' + id, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
}

export default ProjectApi; 