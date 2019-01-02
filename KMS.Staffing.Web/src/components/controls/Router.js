import React, { Component } from 'react'
import { Switch, Route,Redirect  } from 'react-router'
import NotFound from './NotFound';
import ProjectDetail from '../screens/project/ProjectDetail';
import ProjectList from '../screens/project/ProjectList';
import EmployeePage from '../screens/employee/EmployeePage';
import { withRouter } from "react-router-dom";
import EmployeeDetail from '../screens/employee//detail/EmployeeDetail';
import App from '../../App';
class MainRouter extends Component {
  render() {
      
    return (
      <Switch>
          <Route path='/employeelist' component={EmployeePage} />
          <Route exact path='/projectlist' component={ProjectList} />
          <Route path='/projectlist/:id' component={ProjectDetail} />
          <Route exact path="/" render={() => (<Redirect to="/employeelist" />)} />    
          <Route path='/employeedetail' component={EmployeeDetail} />
          <Route path='*' component={NotFound}>
          </Route>
      </Switch>
    )
  }
}

export default withRouter(MainRouter)