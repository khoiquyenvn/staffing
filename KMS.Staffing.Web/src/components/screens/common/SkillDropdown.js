import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import * as skillActions from '../../../actions/skillActions';
import * as ModelUtility from '../../../models/ModelUtility'
import _ from 'lodash/fp';

class SkillDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        }

        this.getSelectedSkills = this.getSelectedSkills.bind(this);
    }

    componentDidMount() {
        this.props.skillActions.loadSkills();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ skills: ModelUtility.getOptionsForDropdown(nextProps.skills, 'SkillId') })
    }

    getSelectedSkills() {
        let selectedSkills = [];
        if (this.props.selectedValue) {
            let selectedStringValues = this.props.selectedValue.split(";#");

            for (let i = 0; i < selectedStringValues.length; i++) {
                let selectedSkill = this.props.skills.find(t => t.Id == selectedStringValues[i]);

                if (selectedSkill) {
                    selectedSkills.push({
                        value: selectedSkill.Id,
                        label: selectedSkill.Name
                    });
                }
            }

            return selectedSkills;
        }
    }

    render() {
        let selectedSkills = this.getSelectedSkills();

        return (
            <Select
                name={this.props.name}
                options={this.state.skills}
                value={selectedSkills}
                isDisabled={!this.props.isEditting}
                isSearchable={this.props.isSearchable}
                isMulti={this.props.isMulti}
                onChange={this.props.onChange} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        skills: state.skills
    };
}

function mapDispatchToProps(dispatch) {
    return {
        skillActions: bindActionCreators(skillActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillDropdown);