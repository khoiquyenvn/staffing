import React from 'react';
class MenuItem extends React.Component {

    render () {
        return (
        <a className='menu-item' activeClassName='active' isActive={this.props.href} href={this.props.href} >{this.props.icon} {this.props.menuValue}</a>
        );
    }
}

export default MenuItem;