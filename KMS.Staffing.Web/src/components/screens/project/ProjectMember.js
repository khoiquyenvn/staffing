import React, { Component , Fragment} from 'react'
import EmployeeCircleAvatar from '../../controls/employee/EmployeeCircleAvatar';

// One item component
// selected prop will be passed
const MemberAvatarInList = ({ employee, selected }) => {
  if (employee === undefined) {
    return (
      <div>
      </div>
    );
  }
    return (
      <div className="member-in-list">
        <EmployeeCircleAvatar employeeImage={employee.Employee.PhotoURL} size='80px'/>
      </div>
    );
  };

  
// All items component
// Important! add unique key
export const EmployeeMenu = (list = []) => list.map(el => {
    const person = el;
   
    return (
      <MemberAvatarInList
        employee={person}
        key={person.Id}
      />
    );
  });

