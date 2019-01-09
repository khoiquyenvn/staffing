import React, { Component } from 'react';
import TitleDropdown from '../common/TitleDropdown';
import _ from 'lodash/fp';

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';
import EmployeeShortInfo from '../../controls/employee/EmployeeShortInfo';

export default class SuggestEmployee extends Component {
    constructor(props) {
        super(props);
        this.getSkillAsString = this.getSkillAsString.bind(this);
    }

    componentDidMount() {
    }

    getSkillAsString() {
        let skills = "";
        let employeeSkills = this.props.suggestEmployee.EmployeeSkill;

        if (this.props.suggestEmployee.EmployeeSkill) {
            for (let i = 0; i < employeeSkills.length; i++) {
                skills = skills + employeeSkills[i].Skill.Name + "; ";
            }

            return skills.substr(0, skills.length - 2);
        }

        return skills;
    }

    render() {
        this.props.suggestEmployee.Skill = this.getSkillAsString();
        return (
            <EmployeeShortInfo employee={this.props.suggestEmployee} />
        )
    }
}
