import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../../../../styles/employee/employee.css';

export default class EmployeeAvatar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.image === undefined) {
            return (<div></div>);
        }
        return (
            <div>
                <img className='employee-avatar' src={this.props.image} alt='Avatar' border="5"/>
            </div>
        );
    }
}