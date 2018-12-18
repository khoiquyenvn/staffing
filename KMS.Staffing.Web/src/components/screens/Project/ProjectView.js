import React, { Component } from 'react'
import ReactTable from "react-table";
import projectShortInformation from '../../../models/ProjectModel';

class ProjectView extends Component {
  render() {
    const projectList = {
      name: 'Izenda',
      description: 'BI Platform',
      teamSize: 20,
      status: 0
    }

    return (
    
      <ReactTable
        data={projectList}
        columns={projectShortInformation}
      />
      )
  }
}

export default ProjectView