import React, { Component } from 'react';
import "../../../styles/employee/EmployeeCircleAvatar.css"

class EmployeeCircleAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '100px'
    }
  }

  componentDidMount() {        
    if (this.props.size !== undefined) {
      this.setState({size: this.props.size});
    }
}

  render() {

    return (
        <div className='eia-image-wrap' style={{height: this.state.size, width: this.state.size}}>
          <img className='eia-image' src={this.props.employeeImage} />
        </div>
        
      )
  }
}

export default EmployeeCircleAvatar