import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { bindActionCreators } from 'redux';
import { renderName, renderStyle,statusLabel  } from '../../../models/ProjectModel';

import * as projectActions from '../../../actions/projectActions';
import { FaBookReader } from 'react-icons/fa';

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
            Cell: row => (
            <label style={{...renderStyle(row.value), ...statusLabel}}>{renderName(row.value)}</label>  // label change with value
                )
        }, {
            Header: '',
            accessor: '',
            Cell: cellInfo => (
            <button className="staffingButton" onClick={()=>this.props.projectActions.enterProjectDetail(cellInfo.original.id)} ><FaBookReader/> View </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)