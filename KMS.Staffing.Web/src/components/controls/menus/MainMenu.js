import React from 'react';
import ReduxBurgerMenu from './Menu';
import menuStyles from '../../../styles/burgerMenu/BurgerMenu.css';
import MenuItem from './MenuItem';
import { FaAddressBook, FaHandshake } from 'react-icons/fa';

class MainMenu extends React.Component {

    render () {
        const mainMenuList = [
            {id: 'employeeList', href:'/employeelist', menuValue:'Employee List', icon: <FaAddressBook/> },
            {id: 'projectList', href:'/projectlist', menuValue:'Project List', icon: <FaHandshake/> },
           ];

        return (
            <ReduxBurgerMenu isOpen={ this.props.isOpen } style={menuStyles.container} disableCloseOnEsc //customCrossIcon={ false }
                        pageWrapId={ this.props.pageWrapId } outerContainerId={ this.props.outerContainerId }>
                {
                    mainMenuList.map(function(object){
                        return <MenuItem key={object.id} href={object.href} menuValue={object.menuValue} icon={object.icon}>
                                </MenuItem>; 
                    })
                }
            </ReduxBurgerMenu>
        );
    }
}

export default MainMenu;