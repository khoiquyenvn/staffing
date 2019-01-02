import React, { Component , Fragment} from 'react'
import ProjectDetailInformation from './ProjectDetailInformation';
import StaffingBoard from '../staffing/StaffingBoard';
import * as projectDetailActions from '../../../actions/projectDetailAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-tabs/style/react-tabs.css';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

class ProjectContent extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    const { projectDetail, tabProjectIndex } = this.props;
    return (
        <Tabs selectedIndex={tabProjectIndex} onSelect={tabProjectIndex => this.setState({ tabProjectIndex })}>
            <TabList>
                <Tab>Information</Tab>
                <Tab>Staffing</Tab>
            </TabList>
            <TabPanel>
                <ProjectDetailInformation />
            </TabPanel>
            <TabPanel>
                <StaffingBoard/>
            </TabPanel>
        </Tabs>
      )
  }
}

const mapStateToProps = (state) => ({
  projectDetail: state.projectDetail,
  tabProjectIndex: state.tabProjectIndex
})

function mapDispatchToProps(dispatch) {
  return {
    projectDetailActions: bindActionCreators(projectDetailActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContent)