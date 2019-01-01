import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { skillsetModel } from '../../../../models/SKillsetModel';

import '../../../../styles/employee/employee.css';

export default class EmployeeSkillset extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        let skills = [];
        if (this.props.employee.EmployeeSkill) {
            skills = this.props.employee.EmployeeSkill.map(skill => {                
                return skill;
            });
        }

        if (skills.length <= 0) {
            return <span>No skill to display.</span>;
        }
        
        return (
            <Fragment>
                <ReactTable
                    data={skills}
                    columns={skillsetModel}
                    defaultPageSize={skills.length}
                />
            </Fragment>
        );
    }
}