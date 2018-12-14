import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './components/controls/Router';
import MainMenu from './components/controls/menus/MainMenu';
import menuStyles from './components/controls/menus/BurgerMenu.css';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter >
                <div  id="outer-container" style={menuStyles.container}>
                    <MainMenu  outerContainerId={ "outer-container" } />
                    <MainRouter  id="page-wrap" style="height: 100%; overflow: auto;" />
                </div>
            </BrowserRouter>
        );
    }
}

