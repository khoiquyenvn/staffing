import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectDropdownInput from '../../controls/common/SelectDropdownInput';
import * as competentLevelActions from '../../../actions/competentLevelActions';

class CompetentLevelDropdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {        
        this.props.competentLevelActions.loadCompetentLevels();
    }

    render() {
        return (
            <SelectDropdownInput
                    name={this.props.name}
                    label={this.props.title}
                    onlyInput={this.props.onlyInput}
                    options={this.props.competentLevels}
                    selectedValue={this.props.selectedValue}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {        
        competentLevels: state.competentLevels
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        competentLevelActions: bindActionCreators(competentLevelActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetentLevelDropdown);