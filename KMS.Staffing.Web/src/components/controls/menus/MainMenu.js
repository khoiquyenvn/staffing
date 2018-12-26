import React from 'react';
import ReduxBurgerMenu from './Menu';
import menuStyles from './BurgerMenu.css';
import MenuItem from './MenuItem';
import { FaAddressBook, FaHandshake } from 'react-icons/fa';

class MainMenu extends React.Component {

    render () {
        return (
            <ReduxBurgerMenu isOpen={ this.props.isOpen } style={menuStyles.container} noOverlay disableCloseOnEsc //customCrossIcon={ false }
                        pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.outerContainerId }>
                <MenuItem href='/employeelist' menuValue='Employee List' icon={[<FaAddressBook/>]} ></MenuItem>
                <MenuItem href='/projectlist' menuValue='Project List' icon={[<FaHandshake/>]} ></MenuItem>
            </ReduxBurgerMenu>
        );
    }
}

export default MainMenu;