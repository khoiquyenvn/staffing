import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { bindActionCreators } from 'redux';
import { renderStatusLabel } from '../../../models/ProjectModel';

import * as projectActions from '../../../actions/projectActions';
import { FaBookReader } from 'react-icons/fa';
import { withRouter } from "react-router-dom";

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.projectActions.loadProjects();
    }

    render() {
        const { projects } = this.props;
        
  
        const projectShortInformation = [{
            Header: 'Name',
            accessor: 'Name'
        }, {
            Header: 'Description',
            accessor: 'Description'
        }, {
            Header: 'Team Size',
            accessor: 'TeamSize'
        }, {
            Header: 'Status',
            accessor: 'Status',
            Cell: row => renderStatusLabel(row.value)
        }, {
            Header: '',
            accessor: '',
            Cell: cellInfo => (
            <button className="staffingButton" onClick={()=>this.props.projectActions.enterProjectDetail(cellInfo.original.Id)} ><FaBookReader/> View </button>
                )
        }];

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

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch)
    };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectList))