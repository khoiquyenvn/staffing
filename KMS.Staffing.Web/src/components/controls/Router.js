import React, { Component } from 'react'
import { Switch, Route,Redirect  } from 'react-router'
import NotFound from './NotFound';
import ProjectDetail from '../screens/project/ProjectDetail';
import ProjectPage from '../screens/project/ProjectPage';
import EmployeePage from '../screens/employee/EmployeePage';
import EmployeeDetail from '../screens/employee//detail/EmployeeDetail';
import App from '../../App';
export default class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
          <Route path='/employeelist' component={EmployeePage} />
          <Route path='/employeedetail' component={EmployeeDetail} />
          <Route path='/projectlist' component={ProjectPage} />
          <Route path='/projectlist/:id' component={ProjectDetail} />
          <Route exact path="/" render={() => (<Redirect to="/employeelist" />)} />    
          <Route path='*' component={NotFound}>
          </Route>
      </Switch>
    )
  }
}