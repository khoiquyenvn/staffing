import * as apiConfig from './apiConfiguration';

class EmployeeApi {
  static getAllEmployees(criteria) {
    const request = new Request(apiConfig.API_URL + apiConfig.EMPLOYEE_MODULE + '/getEmployees', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(criteria)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getEmployeeById(id) {
    const request = new Request(apiConfig.API_URL + apiConfig.EMPLOYEE_MODULE + '/' + id, {
      method: 'GET',
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateEmployeeInformation(employee) {
    const request = new Request(apiConfig.API_URL + apiConfig.EMPLOYEE_MODULE, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(employee)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default EmployeeApi; 