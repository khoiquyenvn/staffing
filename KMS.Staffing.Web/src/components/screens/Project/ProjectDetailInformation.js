import React, { Component , Fragment} from 'react'
import * as projectDetailActions from '../../../actions/projectDetailAction';
import { connect } from 'react-redux';
import { renderStatusLabel } from '../../../models/ProjectModel';
import { bindActionCreators } from 'redux';

class ProjectDetailInformation extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const { projectDetail } = this.props;
    return (
      <Fragment>
        <div>Description: {projectDetail.Description}</div>
        <div>Team Size: {projectDetail.TeamSize}</div>
        <div> Status: {renderStatusLabel(projectDetail.Status)}</div>
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => ({
  projectDetail: state.projectDetail
})

function mapDispatchToProps(dispatch) {
  return {
    projectDetailActions: bindActionCreators(projectDetailActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailInformation)