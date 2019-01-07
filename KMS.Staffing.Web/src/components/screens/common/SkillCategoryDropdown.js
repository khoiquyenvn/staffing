import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import * as skillCategoryActions from '../../../actions/skillCategoryActions';
import * as ModelUtility from '../../../models/ModelUtility'
import _ from 'lodash/fp';

class SkillCategoryDropdown extends Component {
    constructor(props) {
        super(props);
        this.state={
            skillCategories:[]
        }

        this.getSelectedSkillCategories=this.getSelectedSkillCategories.bind(this);
    }

    componentDidMount() {        
        this.props.skillCategoryActions.loadSkillCategories();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ skillCategories: ModelUtility.getOptionsForDropdown(nextProps.skillCategories, 'SkillCategoryId') })
    }

    getSelectedSkillCategories() {
        let selectedSkillCategories = [];
        if (this.props.selectedValue) {
            let selectedStringValues = this.props.selectedValue.split(";#");

            for (let i = 0; i < selectedStringValues.length; i++) {
                let selectedSkillCategory = this.props.skillCategories.find(t => t.Id == selectedStringValues[i]);

                if (selectedSkillCategory) {
                    selectedSkillCategories.push({
                        value: selectedSkillCategory.Id,
                        label: selectedSkillCategory.Name
                    });
                }
            }

            return selectedSkillCategories;
        }
    }

    render() {
        let selectedSkillCategories = this.getSelectedSkillCategories();

        return (
            <Select
                    name={this.props.name}
                    options={this.state.skillCategories}
                    value={selectedSkillCategories}
                    isDisabled={!this.props.isEditting}
                    isSearchable ={this.props.isSearchable}
                    isMulti ={this.props.isMulti}
                    onChange={this.props.onChange} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {        
        skillCategories: state.skillCategories
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        skillCategoryActions: bindActionCreators(skillCategoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillCategoryDropdown);