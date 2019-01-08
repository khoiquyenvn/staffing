import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import * as experienceActions from '../../../actions/experienceActions';
import * as ModelUtility from '../../../models/ModelUtility'
import _ from 'lodash/fp';

class SkillExperienceDropdown extends Component {
    constructor(props) {
        super(props);
        this.state={
            skillExperiences:[]
        }

        this.getSelectedExperiences=this.getSelectedExperiences.bind(this);
    }

    componentDidMount() {        
        this.props.experienceActions.loadExperiences();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ skillExperiences: ModelUtility.getOptionsForDropdown(nextProps.experiences, 'ExperienceId') })
    }

    getSelectedExperiences() {
        let selectedSkillExperiences = [];
        if (this.props.selectedValue) {
            let selectedStringValues = this.props.selectedValue.split(";#");

            for (let i = 0; i < selectedStringValues.length; i++) {
                let selectedSkillExperience = this.props.experiences.find(t => t.Id == selectedStringValues[i]);

                if (selectedSkillExperience) {
                    selectedSkillExperiences.push({
                        value: selectedSkillExperience.Id,
                        label: selectedSkillExperience.Name
                    });
                }
            }

            return selectedSkillExperiences;
        }
    }

    render() {
        let selectedExperiences = this.getSelectedExperiences();

        return (
            <Select
                    name={this.props.name}
                    options={this.state.skillExperiences}
                    value={selectedExperiences}
                    isDisabled={!this.props.isEditting}
                    isSearchable ={this.props.isSearchable}
                    isMulti ={this.props.isMulti}
                    onChange={this.props.onChange} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {        
        experiences: state.experiences
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        experienceActions: bindActionCreators(experienceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillExperienceDropdown);