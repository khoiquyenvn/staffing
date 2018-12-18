import React from 'react';
import ReduxBurgerMenu from './Menu';
import menuStyles from './BurgerMenu.css';
import { FaAddressBook, FaHandshake } from 'react-icons/fa';

class MainMenu extends React.Component {
    render () {
        return (
            <ReduxBurgerMenu isOpen={ this.props.isOpen } style={menuStyles.container} 
                        pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.outerContainerId }>
                <a id="employelist" className="menu-item active" href="/employeelist"><FaAddressBook/> Employee List</a>
                <a id="projectlist" className="menu-item" href="/projectlist"><FaHandshake/> Project List</a>
            </ReduxBurgerMenu>
        );
    }
}

export default MainMenu;