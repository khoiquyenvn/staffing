import React, { Component } from 'react';
import TitleDropdown from '../common/TitleDropdown';
import _ from 'lodash/fp';

import EmployeeShortInfo from '../../controls/employee/EmployeeShortInfo';
import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';

export default class RequestDetailResult extends Component {
    constructor(props) {
        super(props);
        this.getSkillAsString = this.getSkillAsString.bind(this);
    }

    componentDidMount() {
    }

    getSkillAsString() {
        let skills = "";
        let employeeSkills = this.props.employeeResult.EmployeeSkill;

        if (this.props.employeeResult.EmployeeSkill) {
            for (let i = 0; i < employeeSkills.length; i++) {
                skills = skills + employeeSkills[i].Skill.Name + "; ";
            }

            return skills.substr(0, skills.length - 2);
        }

        return skills;
    }

    render() {
        this.props.employeeResult.Skill = this.getSkillAsString();
        return (
            <EmployeeShortInfo employee={this.props.employeeResult} />
        )
    }
}
