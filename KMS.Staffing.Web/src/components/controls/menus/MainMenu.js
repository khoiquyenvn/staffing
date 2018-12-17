import React from 'react';
import ReduxBurgerMenu from './Menu';
import menuStyles from './BurgerMenu.css';

class MainMenu extends React.Component {
    render () {
        return (
            <ReduxBurgerMenu isOpen={ this.props.isOpen } style={menuStyles.container}
                        pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.outerContainerId }>
                <a id="employelist" className="menu-item" href="/employeelist">Employee List</a>
                <a id="projectlist" className="menu-item" href="/projectlist">Project List</a>
            </ReduxBurgerMenu>
        );
    }
}

export default MainMenu;