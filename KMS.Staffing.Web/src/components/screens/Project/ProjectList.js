import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { projectShortInformation } from '../../../models/ProjectModel';
import {loadProjects} from '../../../actions/projectActions';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        const { projects } = this.props;
        return (
            <div>
                <h1>Projects</h1>
                <div>
                    <ReactTable
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

const mapDispatchToProps = (dispatch) => ({
      loadData: () => { dispatch(loadProjects())}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)