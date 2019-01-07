import React, { Component , Fragment} from 'react'
import EmployeeAvatar from "../employee/detail/EmployeeDetail.Avatar"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

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
        <EmployeeAvatar image={employee.Employee.PhotoURL}/>
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

  const Arrow = ({ icon, className }) => {
    return (
      <div
        className={className}
      >{icon}</div>
    );
  };
  
export const ArrowLeft = Arrow({ icon: <FaArrowAltCircleLeft size={70}/>, className: 'arrow-prev' });
export const ArrowRight = Arrow({ icon: <FaArrowAltCircleRight size={70}/>, className: 'arrow-next' });
