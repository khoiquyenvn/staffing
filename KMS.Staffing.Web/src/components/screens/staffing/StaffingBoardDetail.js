import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class StaffingBoardDetail extends Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
    }

    render() {
      
      const { projectDetail } = this.props;
      return (
        <div>STAFFING BOARD DETAIL</div>
        )
    }
  }
  
const mapStateToProps = (state) => ({
    projectDetail: state.projectDetail
})

  export default withRouter(connect(mapStateToProps)(StaffingBoardDetail))