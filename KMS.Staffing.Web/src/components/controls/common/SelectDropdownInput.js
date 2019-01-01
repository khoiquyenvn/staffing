import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SelectDropdownInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = this.props.options.map(option => {
            return <option key={option.Id} value={option.Id}>{option.Name}</option>
        });

        let label = this.props.onlyInput ? <span/> : <label htmlFor={this.props.name}>{this.props.label}</label>;

        return (
            <div className="form-group">
                {label}
                <div className="field">
                    <select className="form-control"
                            name={this.props.name} 
                            value={this.props.selectedValue}
                            onChange={this.props.onChange}
                            disabled={!this.props.isEditting}>
                        {items}
                    </select>
                </div>
            </div>
        );
    }
}