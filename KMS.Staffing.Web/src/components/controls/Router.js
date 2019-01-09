import React, { Component } from 'react'
import { Switch, Route,Redirect  } from 'react-router'
import NotFound from './NotFound';
import ProjectDetail from '../screens/project/ProjectDetail';
import ProjectList from '../screens/project/ProjectList';
import EmployeePage from '../screens/employee/EmployeePage';
import { withRouter } from "react-router-dom";
import EmployeeDetail from '../screens/employee//detail/EmployeeDetail';
import SessionPlanDetail from '../screens/staffing/SessionPlanDetail';
import App from '../../App';

class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
          <Route exact path='/employeelist' component={EmployeePage} />
          <Route exact path='/projectlist' component={ProjectList} />
          <Route exact path='/projectlist/:id' component={ProjectDetail} />
          <Route exact path="/" render={() => (<Redirect to="/employeelist" />)} /> 
          <Route exact path='/employeelist/:id' component={EmployeeDetail} />    
          <Route exact path='/sessionplan/:sessionPlanId' component={SessionPlanDetail} />
          <Route exact path='*' component={NotFound}>
          </Route>
      </Switch>
    )
  }
}

export default withRouter(MainRouter)