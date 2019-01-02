import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../controls/common/TextInput';
import SelectDropdownInput from '../../../controls/common/SelectDropdownInput';

import '../../../../styles/employee/employee.css';

export default class EmployeeInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextInput
                    name="Id"
                    label="Id"
                    value={this.props.employee.DisplayId}
                    isEditting={false} />
                <TextInput
                    name="Name"
                    label="Name"
                    value={this.props.employee.Name}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
                <TextInput
                    name="Email"
                    label="Email"
                    value={this.props.employee.Email}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
                <TextInput
                    name="Phone"
                    label="Phone"
                    value={this.props.employee.Phone}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
                <TextInput
                    name="Address"
                    label="Address"
                    value={this.props.employee.Address}
                    isEditting={this.props.isEditting}                    
                    onChange={this.props.onChangeInformation} />
                <SelectDropdownInput
                    name="TitleId"
                    label="Title"
                    options={this.props.titles}                    
                    selectedValue={this.props.employee.TitleId}
                    isEditting={this.props.isEditting}
                    onChange={this.props.onChangeInformation} />
            </div>
        );
    }
}