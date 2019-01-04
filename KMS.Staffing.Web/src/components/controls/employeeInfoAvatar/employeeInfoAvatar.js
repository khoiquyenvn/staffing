import React, { Component } from 'react';
import "./ProjectHeader.css"

class EmployeeInfoAvatar extends Component {

  render() {
    return (
      <div className='eia-container'>
        <img className='eia-image' src={this.props.employeeAvatar} />
        <div class="eia-content">
          <h1>{this.props.employeeTitle}</h1>
        </div>
      </div>
      )
  }
}

export default ProjectHeader