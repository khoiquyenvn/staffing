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

    static loadSessionPlanList(id) {
      return fetch(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/getSessionPlanList/' + id, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static loadRequestsBySession(sessionPlanId) {
      return fetch(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/getRequestList/' + sessionPlanId, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static getSuggestArrangement(session) {
      const request = new Request(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/arrange', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(session)
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static findEmployeesForRequest(requestInfo) {
      const request = new Request(apiConfig.API_URL + apiConfig.PROJECT_MODULE + '/findEmployeesForRequest', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(requestInfo)
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
}

export default ProjectApi; 