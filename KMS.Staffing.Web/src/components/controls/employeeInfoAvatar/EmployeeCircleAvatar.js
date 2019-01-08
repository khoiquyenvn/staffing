import React, { Component } from 'react';
import "./ProjectHeader.css"
import employeeCircleStyle from './EmployeeCircleAvatar.css';

class EmployeeCircleAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '100px'
    }
  }
  render() {
    if (this.props.size !== undefined) {
      this.setState({size: this.props.size});
    }

    return (
        <div className='eia-image-wrap' style={}>
          <img className='eia-image' src={this.props.employeeImage} style={{height: this.state.size, width: this.state.size}} />
        </div>
        
      )
  }
}

export default EmployeeCircleAvatar