import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectDropdownInput from '../../controls/common/SelectDropdownInput';
import * as skillCategoryActions from '../../../actions/skillCategoryActions';

class SkillCategoryDropdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {        
        this.props.skillCategoryActions.loadSkillCategories();
    }

    render() {
        return (
            <SelectDropdownInput
                    name={this.props.name}
                    label={this.props.title}
                    onlyInput={this.props.onlyInput}
                    options={this.props.skillCategories}
                    selectedValue={this.props.selectedValue}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
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