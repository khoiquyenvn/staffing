import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import * as competentLevelActions from '../../../actions/competentLevelActions';
import * as ModelUtility from '../../../models/ModelUtility'
import _ from 'lodash/fp';

class CompetentLevelDropdown extends Component {
    constructor(props) {
        super(props);
        this.state={
            competentLevels:[]
        }

        this.getSelectedCompetentLevels=this.getSelectedCompetentLevels.bind(this);
    }

    componentDidMount() {        
        this.props.competentLevelActions.loadCompetentLevels();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ competentLevels: ModelUtility.getOptionsForDropdown(nextProps.competentLevels, 'CompetentLevelId') })
    }

    getSelectedCompetentLevels() {
        let selectedCompetentLevels = [];
        if (this.props.selectedValue) {
            let selectedStringValues = this.props.selectedValue.split(";#");

            for (let i = 0; i < selectedStringValues.length; i++) {
                let selectedCompetentLevel = this.props.competentLevels.find(t => t.Id == selectedStringValues[i]);

                if (selectedCompetentLevel) {
                    selectedCompetentLevels.push({
                        value: selectedCompetentLevel.Id,
                        label: selectedCompetentLevel.Name
                    });
                }
            }

            return selectedCompetentLevels;
        }
    }

    render() {
        let selectedCompetentLevels = this.getSelectedCompetentLevels();

        return (
            <Select
                    name={this.props.name}
                    options={this.state.competentLevels}
                    value={selectedCompetentLevels}
                    isDisabled={!this.props.isEditting}
                    isSearchable ={this.props.isSearchable}
                    isMulti ={this.props.isMulti}
                    onChange={this.props.onChange} />
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