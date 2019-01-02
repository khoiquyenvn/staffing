import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { bindActionCreators } from 'redux';
import { renderStatusLabel } from '../../../models/ProjectModel';

import * as projectActions from '../../../actions/projectActions';
import { FaBookReader } from 'react-icons/fa';
import { withRouter } from "react-router-dom";

class StaffingBoard extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
    }

    render() {
        return (<div></div>)
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffingBoard))