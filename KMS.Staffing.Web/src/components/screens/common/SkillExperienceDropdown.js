import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectDropdownInput from '../../controls/common/SelectDropdownInput';
import * as experienceActions from '../../../actions/experienceActions';

class SkillExperienceDropdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {        
        this.props.experienceActions.loadExperiences();
    }

    render() {
        return (
            <SelectDropdownInput
                    name={this.props.name}
                    label={this.props.title}
                    onlyInput={this.props.onlyInput}
                    options={this.props.experiences}
                    selectedValue={this.props.selectedValue}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
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