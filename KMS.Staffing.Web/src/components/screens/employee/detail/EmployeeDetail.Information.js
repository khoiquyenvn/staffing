import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../controls/common/TextInput';
import TitleDropdown from "../../common/TitleDropdown";

import '../../../../styles/employee/employee.css';

export default class EmployeeInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td className="employee-info-label">Id</td>
                            <td>
                                <TextInput
                                    name="Id"
                                    label="Id"
                                    value={this.props.employee.DisplayId}
                                    isEditting={false} />
                            </td>
                        </tr>
                        <tr>
                            <td className="employee-info-label">Name</td>
                            <td>
                                <TextInput
                                    name="Name"
                                    label="Name"
                                    value={this.props.employee.Name}
                                    isEditting={this.props.isEditting}
                                    onChange={this.props.onChangeInformation} />
                            </td>
                        </tr>
                        <tr>
                            <td className="employee-info-label">Email</td>
                            <td>
                                <TextInput
                                    name="Email"
                                    label="Email"
                                    value={this.props.employee.Email}
                                    isEditting={this.props.isEditting}
                                    onChange={this.props.onChangeInformation} />
                            </td>
                        </tr>
                        <tr>
                            <td className="employee-info-label">Phone</td>
                            <td>
                                <TextInput
                                    name="Phone"
                                    label="Phone"
                                    value={this.props.employee.Phone}
                                    isEditting={this.props.isEditting}
                                    onChange={this.props.onChangeInformation} />
                            </td>
                        </tr>
                        <tr>
                            <td className="employee-info-label">Address</td>
                            <td>
                                <TextInput
                                    name="Address"
                                    label="Address"
                                    value={this.props.employee.Address}
                                    isEditting={this.props.isEditting}
                                    onChange={this.props.onChangeInformation} />
                            </td>
                        </tr>
                        <tr>
                            <td className="employee-info-label">Title</td>
                            <td>
                                <TitleDropdown
                                    name="TitleId"
                                    label="Title"
                                    selectedValue={this.props.employee.TitleId}
                                    isEditting={this.props.isEditting}
                                    isSearchable={true}
                                    onChange={this.props.onChangeInformation} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}