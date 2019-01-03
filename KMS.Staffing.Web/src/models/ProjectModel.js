// Import React Table
import "react-table/react-table.css";
import React from "react";
import { FaBookReader } from 'react-icons/fa';

  const projectStatusEnum = {
    working: 0,
    kickoff: 1,
    done: 2
  }
  
  var statusLabel = {
    padding: '5px',
    borderRadius: '10px',
    font: 'Arial',
    textAlign: 'center',
    display: 'inline-block'
  }
  
  var workingStatusLabelStyle = {
    color: 'white',
    background: '#800000',
  }
  
  var kickoffStatusLabelStyle = {
    color: 'white',
    background: '#008080'
  }
  
  var doneStatusLabelStyle = {
    color: 'white',
    background: '#800080'
  }
  
  function renderStyle(projectModelStatus) {
      switch(projectModelStatus) {
        case projectStatusEnum.working: return workingStatusLabelStyle;
        case projectStatusEnum.kickoff: return kickoffStatusLabelStyle;
        case projectStatusEnum.done: return doneStatusLabelStyle;
      }
  }
  
  function renderName(projectModelStatus) {
      switch(projectModelStatus) {
        case projectStatusEnum.working: return 'Working';
        case projectStatusEnum.kickoff: return 'Preparing';
        case projectStatusEnum.done: return 'End';
      }
  }
  
  function renderStatusLabel (status) {
    return (
      <label style={{...renderStyle(status), ...statusLabel}}>{renderName(status)}</label>  
    )
  }

  function renderProjectColumn(enterProjectDetail) {
    let projectShortInformation = [{
      Header: 'Name',
      accessor: 'Name'
    }, {
        Header: 'Description',
        accessor: 'Description'
    }, {
        Header: 'Team Size',
        accessor: 'TeamSize'
    }, {
        Header: 'Status',
        accessor: 'Status',
        Cell: row => renderStatusLabel(row.value)
    }, {
        Header: '',
        accessor: '',
        Cell: cellInfo => (
        <button className="staffingButton" onClick={()=>enterProjectDetail(cellInfo.original.Id)} ><FaBookReader/> View </button>
            )
    }];
     return projectShortInformation;
  }
export { projectStatusEnum, renderStatusLabel , renderProjectColumn}