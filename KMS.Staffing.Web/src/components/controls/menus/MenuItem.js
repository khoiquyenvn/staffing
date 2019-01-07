import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";

class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    CheckActive() { 
        if (this.props.history.location.pathname.includes(this.props.href))
        {
            return 'active';
        }
        return '';
    }

    render() {
        return (
            <a className= {'menu-item bm-item ' + this.CheckActive()} href={this.props.href} >{this.props.icon} {this.props.menuValue}</a>
        );
    }
}

const mapStateToProps = (state) => ({
    currentHref: state.routing
})

export default withRouter(connect(mapStateToProps)(MenuItem));