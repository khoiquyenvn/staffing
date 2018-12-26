import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as employeeActions from '../../../actions/employeeActions';
import EmployeeList from './EmployeeList';

class EmployeePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Employees</h1>
                <div>
                    <EmployeeList employees={this.props.employees} />
                </div>
            </div>
        )
    }
}

function updateEmployeeTitle(employees, tiltes) {  
    let emps = employees.map(emp => {
        var title = tiltes.filter(tit => tit.Id == emp.TitleId);
        return {
            Id: emp.Id,
            Name: emp.Name,
            Photo: emp.Photo,
            PhotoURL: emp.PhotoURL,
            Email: emp.Email,
            Phone: emp.Phone,
            Address: emp.Address,
            Title: title[0] ? title[0].Name : ''
        };
    })

    return emps.filter(emp => emp != undefined)
  }

function mapStateToProps(state, ownProps) {
    return {
        employees: updateEmployeeTitle(state.employees, state.titles),
        titles: state.titles
    };
}

export default connect(mapStateToProps)(EmployeePage);