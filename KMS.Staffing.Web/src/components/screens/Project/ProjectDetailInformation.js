import React, { Component , Fragment} from 'react'
import ReactTable from "react-table";
class ProjectDetailInformation extends Component {
  render() {
    const initialProjectDetail = {
      name: 'Izenda',
      description: 'BI Platform',
      teamSize: 20,
      status: 0,
      member: []
    }

    return (
      <Fragment>
        <ProjectHeader/>
        {/* <img src="data:image/jpeg;base64,{projectDetail.image}" /> */}
        {/* <table style="width:100%">
          <theader>
            <th>Description</th>
            <th>Detail</th>
          </theader>
          <tbody>
            <th>{projectDetail.description}</th>
            <th><ProjectDetail/></th>
          </tbody>
        </table> */}
      </Fragment>
      )
  }
}

export default ProjectDetailInformation