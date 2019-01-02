import React, { Component } from 'react';
import { Router } from 'react-router'
import MainRouter from './components/controls/Router';
import MainMenu from './components/controls/menus/MainMenu';
import "./App.css";

import { withRouter } from "react-router-dom";
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={this.props.history} >
                <div id="outer-container" >
                    <MainMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container"}/>
                    <main id="page-wrap"  >
                        <MainRouter />
                    </main>
                </div>
            </Router>
        );
    }
}