import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound';
import ProjectList from '../screens/Project/ProjectList';
import ProjectDetail from '../screens/Project/ProjectDetail';
import EmployeePage from '../screens/employee/EmployeePage';

export default class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
        <Route path='/employeelist' component={EmployeePage} />
        <Route path='/projectlist' component={ProjectList} />
        <Route path='/projectlist/:id' component={ProjectDetail} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}