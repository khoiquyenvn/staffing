import React, { Component } from 'react';
import "../../../styles/employee/EmployeeShortInfo.css";
import EmployeeCircleAvatar from './EmployeeCircleAvatar';


class EmployeeShortInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let titleName = (this.props.employee.Title) ? this.props.employee.Title.Name : '';

        return (
            <div className="employee-card employee-containter ">
                <div className="employee-container-ava">
                    <EmployeeCircleAvatar employeeImage={this.props.employee.PhotoURL} />
                </div>
                <div className="employee-container-info w3-container">
                    <h5 className='w3-text-blue'>{this.props.employee.Name}</h5>
                    <h6>{this.props.employee.DisplayId}</h6>
                    <h6>{titleName}</h6>
                    <h6>{this.props.employee.Skill}</h6>
                </div>
            </div>

        )
    }
}

export default EmployeeShortInfo
