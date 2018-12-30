import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../../../styles/common/common.css';

export default class SearchControl extends Component {
    constructor(props) {
        super(props);
        this.handlePressEnter = this.handlePressEnter.bind(this);
    }

    handlePressEnter(e) {
        if (e.charCode === 13 || e.key === 'Enter') {
            this.props.handleSearch();
        }
    }

    render() {
        return (
            <div className='search-container'>
                <input className='search-box'
                    type='text'
                    name='searchBox'
                    placeholder={this.props.placeHolder}
                    value={this.props.searchValue}
                    onChange={this.props.changeSearchValue}
                    onKeyPress={this.handlePressEnter} />
                <button className='search-button' onClick={this.props.handleSearch}>Search</button>
            </div>
        );
    }
}