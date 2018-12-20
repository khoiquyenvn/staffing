import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employees } = this.props;

        if (employees.data) {
            return (
                <ul>
                    {employees.data.children.map(emp =>
                        <li key={emp.data.created_utc}>
                            {emp.data.title}
                        </li>
                    )}
                </ul>
            );
        }
        else {
            return <span>No employee was found</span>;
        }
    }
}