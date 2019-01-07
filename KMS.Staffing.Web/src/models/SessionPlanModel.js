import "react-table/react-table.css";
import React from "react";
import { FaBookReader } from 'react-icons/fa';
import {formatDate} from '../common/DateTimeCommon';

  const sessionPlanStatusEnum = {
    inProgress: 0,
    completed: 1,
    pending: 2
  }
  
  var statusLabel = {
    padding: '5px',
    borderRadius: '10px',
    font: 'Arial',
    textAlign: 'center',
    display: 'inline-block',
    background: 'white',
    border: '2px solid'
  }
  
  var inProgressStatusLabelStyle = {
    color: '#800000',
    borderColor: '#800000',
  }
  
  var completedStatusLabelStyle = {
    color: '#008080',
    borderColor: '#008080'
  }
  
  var pendingStatusLabelStyle = {
    color: 'grey',
    borderColor: 'grey'
  }
  
  function renderStyle(sessionPlanStatus) {
      switch(sessionPlanStatus) {
        case sessionPlanStatusEnum.inProgress: return inProgressStatusLabelStyle;
        case sessionPlanStatusEnum.completed: return completedStatusLabelStyle;
        case sessionPlanStatusEnum.pending: return pendingStatusLabelStyle;
      }
  }
  
  function renderSessionPlanStatusName(sessionPlanStatus) {
      switch(sessionPlanStatus) {
        case sessionPlanStatusEnum.inProgress: return 'In - Progress';
        case sessionPlanStatusEnum.completed: return 'Completed';
        case sessionPlanStatusEnum.pending: return 'Pending';
      }
  }
  
  function renderStatusLabel (status) {
    return (
      <label style={{...renderStyle(status), ...statusLabel}}>{renderSessionPlanStatusName(status)}</label>  
    )
  }

  function renderSessionPlanInfoColumn(enterSessionPlanDetail, projectId) {
    let sessionPlanInfo = [{
      Header: 'Start Date',
      accessor: 'StartDate',
      Cell: row => formatDate(row.value)
    }, {
        Header: 'End Date',
        accessor: 'EndDate',
        Cell: row => formatDate(row.value)
    }, {
        Header: 'Status',
        accessor: 'Status',
        Cell: row => renderStatusLabel(row.value)
    }, {
        Header: '',
        accessor: '',
        Cell: cellInfo => (
        <button className="w3-btn w3-dark-grey w3-round-xxlarge" onClick={()=>enterSessionPlanDetail(projectId, cellInfo.original.Id)} ><FaBookReader/> View </button>
            )
    }];

    return sessionPlanInfo;
  }
export { sessionPlanStatusEnum, renderSessionPlanInfoColumn, renderSessionPlanStatusName}