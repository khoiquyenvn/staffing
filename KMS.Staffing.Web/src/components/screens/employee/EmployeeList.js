import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import * as EmployeeModel from '../../../models/EmployeeModel';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employees } = this.props;

        if (employees.length <= 0) {
            return <span>No employee was found. Loading ...</span>;
        }
        
        return (
            <Fragment>
                <ReactTable
                    data={employees}
                    columns={EmployeeModel.getEmployeeModel(false, this.props.accessEmployeeDetailAction)}
                    defaultPageSize={5}
                />
            </Fragment>
        );
    }
}