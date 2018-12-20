import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound';
import EmployeeList from '../screens/EmployeeList';
import ProjectList from '../screens/Project/ProjectList';
import ProjectDetail from '../screens/Project/ProjectDetail';

export default class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
        <Route path='/employeelist' component={EmployeeList} />
        <Route path='/projectlist' component={ProjectDetail} />
        <Route path='/projectlist/:id' component={ProjectDetail} />
        <Route path='*' component={NotFound} />
      </Switch>
    )
  }
}