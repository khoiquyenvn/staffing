import React, { Component, Fragment } from 'react'
import ReactTable from "react-table";
import { projectShortInformation } from '../../../models/ProjectModel';

// const ProjectList = (projectList) =>
// {
//     return (
//       <frameElement>
//         <h1>Project List</h1>
//         <ReactTable
//           data={projectList}
//           columns={ProjectShortInformation}
//           defaultPageSize={10}
//         />
//       </frameElement>
//       )
// }

export default class ProjectList extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      const { projects } = this.props;
      return (
          <Fragment>

          </Fragment>
      );
  }
}