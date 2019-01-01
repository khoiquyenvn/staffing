import employeeApi from '../api/employeeApi';
import * as actionTypes from './actionTypes';

export function loadEmployees(criteria) {
  return function (dispatch) {
    return employeeApi.getAllEmployees(criteria).then(employees => {
      dispatch(loadEmployeesSuccess(employees));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadEmployeesSuccess(employees) {
  return { type: actionTypes.LOAD_EMPLOYEES_SUCCESS, employees };
}
