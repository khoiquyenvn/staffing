import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let label = this.props.onlyInput ? <span/> : <label htmlFor={this.props.name}>{this.props.label}</label>;

        return (
            <div className="form-group">                
                <div className="field">
                    <input
                        className="form-control"
                        type="text"
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        readOnly={!this.props.isEditting}/>
                </div>
            </div>
        );
    }
}