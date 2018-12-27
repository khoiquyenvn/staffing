import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../actions/employeeActions';
import EmployeeList from './EmployeeList';

import '../../../styles/common/common.css';

class EmployeePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }

        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePressEnter = this.handlePressEnter.bind(this);
    }

    changeSearchValue(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    handleSearch() {
        const searchCriteriaValue = this.state.searchValue;
        let criteria = {
            criteria: [{
                key: 'All',
                value: ''
            }]
        };

        if (searchCriteriaValue.length > 0) {
            criteria = {
                criteria: [{
                    key: 'All',
                    value: searchCriteriaValue
                }]
            };
        }

        this.props.actions.loadEmployees(criteria);

        this.setState({
            searchValue: ''
        });
    }

    handlePressEnter(e) {
        if (e.charCode === 13 || e.key === 'Enter') {
            this.handleSearch();
        }
    }

    render() {
        return (
            <div>
                <h1>Employees</h1>
                <div>
                    <div className='search-container'>
                        <input className='search-box'
                            type='text'
                            name='searchBox'
                            placeholder='Search by Id, Name, Title, Email, Address'
                            value={this.state.searchValue}
                            onChange={this.changeSearchValue}
                            onKeyPress={this.handlePressEnter} />
                        <button className='search-button' onClick={this.handleSearch}>Search</button>
                    </div>
                    <EmployeeList employees={this.props.employees} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        employees: state.employees,
        titles: state.titles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);