import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { bindActionCreators } from 'redux';
import { renderProjectColumn } from '../../../models/ProjectModel';

import * as projectActions from '../../../actions/projectActions';
import { withRouter } from "react-router-dom";
import StaffingPageHeader from '../../controls/common/StaffingPageHeader';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.projectActions.loadProjects();
    }

    render() {
        const { projects } = this.props;
  
        const projectShortInformation = renderProjectColumn(this.props.projectActions.enterProjectDetail);

        return (
            <div>
                <StaffingPageHeader title='Projects'/>
                <div>
                    <ReactTable className='-highlight'
                        data={projects}
                        columns={projectShortInformation}
                        defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }
  }

const mapStateToProps = (state) => ({
    projects: state.projects
})

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch)
    };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectList))