import employeeApi from '../api/employeeApi';
import * as actionTypes from './actionTypes';

export function loadEmployeeById() {
  return function (dispatch) {
    return employeeApi.getEmployeeById().then(emp => {
      dispatch(loadEmployeeByIdSuccess(emp));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateEmployee(employee) {
  return function (dispatch) {
    return employeeApi.updateEmployeeInformation(employee).then(emp => {
      dispatch(updateEmployeeSuccess(emp));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadEmployeeByIdSuccess(selectedEmployee) {
  return { type: actionTypes.LOAD_EMPLOYEE_BY_ID_SUCCESS, selectedEmployee };
}


export function updateEmployeeSuccess(updatedEmployee) {
  return { type: actionTypes.UPDATE_EMPLOYEE_SUCCESS, updatedEmployee };
}