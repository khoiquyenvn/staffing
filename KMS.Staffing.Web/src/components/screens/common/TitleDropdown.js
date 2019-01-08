import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import * as titleActions from '../../../actions/titleActions';
import * as ModelUtility from '../../../models/ModelUtility'
import _ from 'lodash/fp';

class TitleDropdown extends Component {
    constructor(props) {
        super(props);
        this.state={
            titles:[]
        }

        this.getSelectedTitles=this.getSelectedTitles.bind(this);
    }

    componentDidMount() {        
        this.props.titleActions.loadTitles();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ titles: ModelUtility.getOptionsForDropdown(nextProps.titles, 'TitleId') })
    }

    getSelectedTitles() {
        let selectedTitles = [];
        if (this.props.selectedValue) {
            let selectedStringValues = this.props.selectedValue.split(";#");

            for (let i = 0; i < selectedStringValues.length; i++) {
                let selectedTitle = this.props.titles.find(t => t.Id == selectedStringValues[i]);

                if (selectedTitle) {
                    selectedTitles.push({
                        value: selectedTitle.Id,
                        label: selectedTitle.Name
                    });
                }
            }

            return selectedTitles;
        }
    }

    render() {
        let selectedTitles = this.getSelectedTitles();

        return (
            <Select
                    name={this.props.name}
                    options={this.state.titles}
                    value={selectedTitles}
                    isDisabled={!this.props.isEditting}
                    isSearchable ={this.props.isSearchable}
                    isMulti ={this.props.isMulti}
                    onChange={this.props.onChange} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {        
        titles: state.titles
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        titleActions: bindActionCreators(titleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleDropdown);