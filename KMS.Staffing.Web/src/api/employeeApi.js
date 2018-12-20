class EmployeeApi {  
    static getAllEmployees() {
      return fetch('https://www.reddit.com/r/reactjs.json').then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }
}

export default EmployeeApi; 