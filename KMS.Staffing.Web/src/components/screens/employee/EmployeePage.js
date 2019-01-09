import React, { PropTypes  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../actions/employeeActions';
import EmployeeList from './EmployeeList';
import SearchControl from '../../controls/search/SearchControl';

import { withRouter } from "react-router-dom";
import StaffingPageHeader from '../../controls/common/StaffingPageHeader';

class EmployeePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.employeeActions.loadEmployees({});
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

        this.props.employeeActions.loadEmployees(criteria);        
    }

    render() {
        return (
            <div>
                <StaffingPageHeader title='Employees'/>
                <div>
                    <SearchControl placeHolder='Search by Id, Name, Title, Email, Address'
                        searchValue={this.state.searchValue}
                        changeSearchValue={this.changeSearchValue}
                        handleSearch={this.handleSearch} />
                    <EmployeeList accessEmployeeDetailAction={this.props.employeeActions.accessEmployeeDetail} employees={this.props.employees} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        employees: state.employees
    };
}

function mapDispatchToProps(dispatch) {
    return {
        employeeActions: bindActionCreators(employeeActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage));