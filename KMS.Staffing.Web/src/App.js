import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './components/controls/Router';
import MainMenu from './components/controls/menus/MainMenu';
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter >
                <div id="outer-container" >
                    <MainMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container"}/>
                    <main id="page-wrap"  >
                        <MainRouter />
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

