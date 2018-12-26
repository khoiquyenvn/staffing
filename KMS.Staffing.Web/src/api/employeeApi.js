import * as apiConfig from './apiConfiguration';

class EmployeeApi {
  static getAllEmployees() {
    return fetch(apiConfig.API_URL + apiConfig.EMPLOYEE_MODULE, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default EmployeeApi; 