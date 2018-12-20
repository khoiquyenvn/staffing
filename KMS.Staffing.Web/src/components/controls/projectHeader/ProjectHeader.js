import React, { Component } from 'react';
import "./ProjectHeader.css"

class ProjectHeader extends Component {

  render() {
    return (
      <div className='ph-container'>
        <img className='ph-image' src={this.props.projectImage} />
        <div class="ph-content">
          <h1>{this.props.projectName}</h1>
        </div>
      </div>
      )
  }
}

export default ProjectHeader