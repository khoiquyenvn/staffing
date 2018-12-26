import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound';
import ProjectDetail from '../screens/project/ProjectDetail';
import ProjectPage from '../screens/project/ProjectPage';
import EmployeePage from '../screens/employee/EmployeePage';

export default class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
        <Route path='/employeelist' component={EmployeePage} />
        <Route path='/projectlist' component={ProjectPage} />
        <Route path='/projectlist/:id' component={ProjectDetail} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}