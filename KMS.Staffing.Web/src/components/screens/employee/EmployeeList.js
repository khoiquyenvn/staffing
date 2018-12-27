import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { employeeShortInformation } from '../../../models/EmployeeModel';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employees } = this.props;

        if (employees.length <= 0) {
            return <span>No employee was found</span>;
        }
        
        return (
            <frameElement>
                <ReactTable
                    data={employees}
                    columns={employeeShortInformation}
                    defaultPageSize={5}
                />
            </frameElement>
        );
    }
}