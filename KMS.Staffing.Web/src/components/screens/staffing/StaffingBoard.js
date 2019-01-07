import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import { bindActionCreators } from 'redux';


import * as projectDetailActions from '../../../actions/projectDetailAction';
import { withRouter } from "react-router-dom";
import { renderSessionPlanInfoColumn } from '../../../models/SessionPlanModel';

class StaffingBoard extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
        this.props.projectDetailActions.loadSessionPlanList(this.props.projectDetail.Id);
    }

    render() {
        var sessionPlanInfoColumn = renderSessionPlanInfoColumn(this.props.projectDetailActions.enterSessionPlanDetail,
                                                                this.props.projectDetail.Id);
        var sessionPlans = this.props.projectDetail.SessionPlans;
        return (
        <Fragment>
            <ReactTable className='-highlight'
                data={sessionPlans}
                columns={sessionPlanInfoColumn}
                defaultPageSize={10}
                    />
        </Fragment>)
    }
  }

const mapStateToProps = (state) => ({
    projectDetail: state.projectDetail
})

function mapDispatchToProps(dispatch) {
    return {
        projectDetailActions: bindActionCreators(projectDetailActions, dispatch)
    };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffingBoard))