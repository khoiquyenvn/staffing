import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound';
import EmployeePage from '../employee/EmployeePage';
import ProjectList from '../screens/ProjectList';

export default class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
        <Route path='/employeelist' component={EmployeePage} />
        <Route path='/projectlist' component={ProjectList} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}