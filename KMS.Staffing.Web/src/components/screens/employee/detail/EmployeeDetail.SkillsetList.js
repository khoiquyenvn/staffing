import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import EmployeeSkillset from "./EmployeeDetail.Skillset";

import '../../../../styles/skillSet/skillSetStyles.css';

export default class EmployeeSkillsetList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.employee.EmployeeSkill <= 0) {
            return <span>No skill to display.</span>;
        }

        let skills = this.props.employee.EmployeeSkill.map(empSkill => {
            return (
                <EmployeeSkillset employeeSkill={empSkill}
                    isEditting={this.props.isEditting}
                    isSearchable={true}
                    onChangeSkillCategory={this.props.onChangeSkillCategory}
                    onChangeExperience={this.props.onChangeExperience}
                    onChangeCompetentLevel={this.props.onChangeCompetentLevel} />
            );
        });

        return (
            <Fragment>
                <table className="skillset-container">
                    <tbody>
                        <tr>
                            <th>Skill</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Competent Level</th>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}