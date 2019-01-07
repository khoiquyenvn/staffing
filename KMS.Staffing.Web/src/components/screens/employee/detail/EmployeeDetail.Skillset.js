import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SkillCategoryDropdown from "../../../screens/common/SkillCategoryDropdown";
import SkillExperienceDropdown from "../../../screens/common/SkillExperienceDropdown";
import CompetentLevelDropdown from "../../../screens/common/CompetentLevelDropdown";

import '../../../../styles/skillSet/skillSetStyles.css';

export default class EmployeeSkillset extends Component {
    constructor(props) {
        super(props);
        this.handleOnChangeSkillCategory = this.handleOnChangeSkillCategory.bind(this);
        this.handleOnChangeExperience = this.handleOnChangeExperience.bind(this);
        this.handleOnChangeCompetentLevel = this.handleOnChangeCompetentLevel.bind(this);
    }

    handleOnChangeSkillCategory(even){    
        this.props.onChangeSkillCategory(this.props.employeeSkill.Id, even.value);
    }

    handleOnChangeExperience(even){        
        this.props.onChangeExperience(this.props.employeeSkill.Id, even.value);
    }

    handleOnChangeCompetentLevel(even){        
        this.props.onChangeCompetentLevel(this.props.employeeSkill.Id, even.value);
    }

    render() {
        return (
            <tr key={this.props.employeeSkill.Id}>
                <td>{this.props.employeeSkill.Skill.Name}</td>
                <td>
                    <SkillCategoryDropdown
                        name="SkillCategoryId"
                        label="SkillCategory"
                        selectedValue={this.props.employeeSkill.Skill.CategoryId}
                        isEditting={this.props.isEditting}
                        isSearchable={true}
                        onChange={this.handleOnChangeSkillCategory} />
                </td>
                <td>
                    <SkillExperienceDropdown
                        name="ExperienceId"
                        label="Experience"
                        selectedValue={this.props.employeeSkill.ExperienceId}
                        isEditting={this.props.isEditting}
                        isSearchable={true} 
                        onChange={this.handleOnChangeExperience} />
                </td>
                <td>
                    <CompetentLevelDropdown
                        name="CompetentLevelId"
                        label="CompetentLevel"
                        selectedValue={this.props.employeeSkill.CompetentLevelId}
                        isEditting={this.props.isEditting}
                        isSearchable={true} 
                        onChange={this.handleOnChangeCompetentLevel} />
                </td>
            </tr>
        );
    }
}