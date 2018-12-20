import React, { Component } from 'react'
import ReactTable from "react-table";
import { projectShortInformation } from '../../../models/ProjectModel';

class ProjectList extends Component {
  render() {
    const projectList = [{
      name: 'Izenda',
      description: 'BI Platform',
      teamSize: 20,
      status: 0
    }]

    return (
      <frameElement>
        <h1>Project List</h1>
        <ReactTable
          data={projectList}
          columns={projectShortInformation}
          defaultPageSize={10}
        />
      </frameElement>
      )
  }
}

export default ProjectList