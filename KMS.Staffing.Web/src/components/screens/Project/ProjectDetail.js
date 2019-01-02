import React, { Component, Fragment } from 'react'
import ReactTable from "react-table"
import ProjectHeader from '../../controls/projectHeader/ProjectHeader';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as projectActions from '../../../actions/projectActions';

class ProjectDetail extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.projectActions.loadProjectDetail(id);
  }

  render() {
    
    const { projectDetail } = this.props;
    return (
      <Fragment>
        <ProjectHeader projectName={projectDetail.name} projectImage={projectDetail.image}/>
        {/* <table style="width:100%">
          <theader>
            <th>Description</th>
            <th>Detail</th>
          </theader>
          <tbody>
            <th>{initialProjectDetail.description}</th>
            <th><ProjectDetail/></th>
          </tbody>
        </table>   */}
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => ({
  projectDetail: state.projectDetail
})

function mapDispatchToProps(dispatch) {
  return {
      projectActions: bindActionCreators(projectActions, dispatch)
  };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProjectDetail))