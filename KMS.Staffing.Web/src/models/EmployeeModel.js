// Import React Table
import React from "react";
import "react-table/react-table.css";
import { FaBookReader } from 'react-icons/fa';

export function getEmployeeModel(isEditting, accessEmployeeDetailAction) {
  let employeeShortInformation = [{
    Header: 'Id',
    accessor: 'DisplayId'
  }, {
    Header: '',
    accessor: 'PhotoURL',
    Cell: row => (
      <img style={ava_emp} src={row.value} />
    )
  }, {
    Header: 'Name',
    accessor: 'Name'
  }, {
    Header: 'Title',
    accessor: 'Title.Name'
  }, {
    Header: 'Email',
    accessor: 'Email'
  }, {
    Header: 'Phone',
    accessor: 'Phone',
  }, {
    Header: 'Address',
    accessor: 'Address',
  }, {
    Header: '',
    accessor: '',
    Cell: cellInfo => (
      <button className="w3-btn w3-green" onClick={()=>accessEmployeeDetailAction(cellInfo.original.Id)} ><FaBookReader/> View </button>
    )
  }];

  var ava_emp = {
    height: '55px',
    width: '50px'
  };

  return employeeShortInformation;
}