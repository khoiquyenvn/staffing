import React, { Component, Fragment } from 'react'
import ProjectHeader from '../../controls/projectHeader/ProjectHeader';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as projectDetailActions from '../../../actions/projectDetailAction';
import { bindActionCreators } from 'redux';
import ProjectContent from './ProjectContent';

class ProjectDetail extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.projectDetailActions.loadProjectDetail(id);
  }

  render() {
    
    const { projectDetail } = this.props;
    return (
      <Fragment>
        <ProjectHeader projectName={projectDetail.Name} projectImage={projectDetail.Image}/>
        <ProjectContent/>
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProjectDetail))