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
    display: 'inline-block',
    background: 'white',
    border: '2px solid'
  }
  
  var workingStatusLabelStyle = {
    color: '#800000',
    borderColor: '#800000',
  }
  
  var kickoffStatusLabelStyle = {
    color: '#008080',
    borderColor: '#008080'
  }
  
  var doneStatusLabelStyle = {
    color: '#800080',
    borderColor: '#800080'
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
        <button className="w3-btn w3-dark-grey w3-round-xxlarge" onClick={()=>enterProjectDetail(cellInfo.original.Id)} ><FaBookReader/> View </button>
            )
    }];

    return projectShortInformation;
  }
export { projectStatusEnum, renderStatusLabel , renderProjectColumn, renderName}