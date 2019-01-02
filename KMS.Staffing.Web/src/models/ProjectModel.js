// Import React Table
import "react-table/react-table.css";
import React from "react";
import { FaBookReader } from 'react-icons/fa';

  const projectStatusEnum = {
    working: 0,
    kickoff: 1,
    done: 2
  }

  const projectModel = {
    name : '',
    description : '',
    teamSize : 0,
    status : projectStatusEnum.working
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
export { projectModel, projectStatusEnum, projectShortInformation, renderStyle, renderName, statusLabel, renderStatusLabel }