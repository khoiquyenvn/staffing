import React, { Component } from 'react';
import TitleDropdown from '../common/TitleDropdown';
import _ from 'lodash/fp';

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';

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
        return (
            <div className="request-result-card request-result-containter">
                <div className="result-container-ava">
                    <h5>{this.props.suggestEmployee.Name}</h5>
                    <img src={this.props.suggestEmployee.PhotoURL} className="emp-avatar-card" />
                </div>
                <div className="result-container-info">
                    <h6>{this.props.suggestEmployee.DisplayId}</h6>
                    <h6>{this.props.suggestEmployee.Title.Name}</h6>
                    <h6>{this.getSkillAsString()}</h6>
                </div>
            </div>
        )
    }
}
