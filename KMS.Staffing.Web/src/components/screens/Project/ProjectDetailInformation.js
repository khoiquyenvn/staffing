import React, { Component , Fragment} from 'react'
import * as projectDetailActions from '../../../actions/projectDetailAction';
import { connect } from 'react-redux';
import { renderName } from '../../../models/ProjectModel';
import { bindActionCreators } from 'redux';
import TextInput from '../../controls/common/TextInput';

class ProjectDetailInformation extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    const { projectDetail } = this.props;
    return (
      <Fragment>
        <TextInput
                    name="Description"
                    label="Description"
                    value={projectDetail.Description}
                    isEditting={false} />
        <TextInput
                    name="TeamSize"
                    label="Team Size"
                    value={projectDetail.TeamSize}
                    isEditting={false} />
        <TextInput
                    name="Status"
                    label="Status"
                    value={renderName(projectDetail.Status)}
                    isEditting={false} />
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