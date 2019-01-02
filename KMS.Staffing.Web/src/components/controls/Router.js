import React, { Component } from 'react'
import { Switch, Route,Redirect  } from 'react-router'
import NotFound from './NotFound';
import ProjectDetail from '../screens/project/ProjectDetail';
import ProjectList from '../screens/project/ProjectList';
import EmployeePage from '../screens/employee/EmployeePage';

import { withRouter } from "react-router-dom";
class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
          <Route path='/employeelist' component={EmployeePage} />
          <Route path='/projectlist' component={ProjectList} />
          <Route path='/projectdetail/:id' component={ProjectDetail} />
          <Route path="/" render={() => (<Redirect to="/employeelist" />)} />    
          <Route path='*' component={NotFound}>
          </Route>
      </Switch>
    )
  }
}

export default withRouter(MainRouter)