import React from 'react';

class MenuItem extends React.Component {
    CheckActive() {
        if (this.props.href === '/employeelist')
        {
            return 'active';
        }
    }
    
    render () {
        return (
            <a className={`menu-item bm-item ${this.CheckActive()}`} href={this.props.href} >{this.props.icon} {this.props.menuValue}</a>
        );
    }
}

export default MenuItem;