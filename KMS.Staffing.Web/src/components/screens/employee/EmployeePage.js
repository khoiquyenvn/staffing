import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as employeeActions from '../../../actions/employeeActions';
import EmployeeList from './EmployeeList';

class EmployeePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Employees</h1>
                <div>
                    <EmployeeList employees={this.props.employees} />
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

export default connect(mapStateToProps)(EmployeePage);