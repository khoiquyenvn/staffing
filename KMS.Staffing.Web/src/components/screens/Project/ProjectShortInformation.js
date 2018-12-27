import React from "react";
import "react-table/react-table.css";
import { FaBookReader } from 'react-icons/fa';
import { projectStatusEnum } from "../../../models/ProjectModel";


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

const projectShortInformation = [{
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
    Cell: row => (
      <label style={{...renderStyle(row.value), ...statusLabel}}>{renderName(row.value)}</label>  // label change with value
        )
  }, {
    Header: '',
    accessor: '',
    Cell: row => (
      <button className="staffingButton"><FaBookReader/> View </button>
        )
  }];

export default projectShortInformation