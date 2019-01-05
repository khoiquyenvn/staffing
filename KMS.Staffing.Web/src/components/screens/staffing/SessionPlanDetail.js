import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderStatusLabel } from '../../../models/ProjectModel';
import * as utility from '../../../utility/uuidUtility';
import RequestDetailList from './RequestDetailList';
import RequestDetailResultList from './RequestDetailResultList';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash/fp';

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';

export default class SessionPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: {
                Id: utility.GenerateUUID(),
                requests: [
                    {
                        Id: utility.GenerateUUID(),
                        TitleId: '82e8f005-00db-4954-a1de-d6e43b037001',
                        Number: 2
                    },
                    {
                        Id: utility.GenerateUUID(),
                        TitleId: '82e8f005-00db-4954-a1de-d6e43b037002',
                        Skills: '120e768d-1ffd-4bfc-be39-ab23170bda72;#120e768d-1ffd-4bfc-be39-ab23170bda74',
                        CompetentLevelId: '0e3b823e-a2a7-4a50-8edf-d29bd7a20234',
                        Number: 2
                    }
                ]
            },
            employeeResults:[
                {
                    Id: 795,
                    DisplayId: '0795',
                    Name: 'An Tran Truong Le',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/anle.jpg',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
                        Name: 'Senior Sofware Engineer'
                    }
                },
                {
                    Id: 861,
                    DisplayId: '0861',
                    Name: 'Khoi Minh Nguyen',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/khoinguyen.jpg',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
                        Name: 'Senior Sofware Engineer'
                    }
                },
                {
                    Id: 1513,
                    DisplayId: '1513',
                    Name: 'Trang Thi Dieu Ha',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/trangha.png',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
                        Name: 'Senior Sofware Engineer'
                    },
                    EmployeeSkill:[
                        {
                            Skill:{
                                Name: "C#",
                            }
                        },
                        {
                            Skill:{
                                Name: "Javascript",
                            }
                        }
                    ]
                },
                {
                    Id: 731,
                    DisplayId: '0731',
                    Name: 'Vi Hanh Phung',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/viphung.jpg',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
                        Name: 'Senior QA Engineer'
                    }
                },
                {
                    Id: 2000,
                    DisplayId: '2000',
                    Name: 'New Employee',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
                        Name: 'Senior QA Engineer'
                    },
                },
                {
                    Id: 2001,
                    DisplayId: '2001',
                    Name: 'New Employee',
                    PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
                    Title:{
                        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
                        Name: 'Senior QA Engineer'
                    },
                }
            ]
        };

        this.updateNewRequests = this.updateNewRequests.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleAddNewRequest = this.handleAddNewRequest.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
    }

    componentDidMount() {
    }

    updateNewRequests(newRequests) {
        this.setState((currentState) => {
            let nextSession = currentState.session;
            nextSession.requests = newRequests;

            return {
                session: nextSession
            };
        });
    }

    handleChangeTitle(requestId, titleId) {
        let nextRequests = this.state.session.requests.map(r => {
            if (r.Id == requestId) {
                r.TitleId = titleId;
            }

            return r;
        });

        if (nextRequests.length > 0) {
            this.updateNewRequests(nextRequests);
        }
    }

    handleChangeSkill(requestId, newSkills) {
        let nextRequests = this.state.session.requests.map(r => {
            if (r.Id == requestId) {
                r.Skills = newSkills;
            }

            return r;
        });

        if (nextRequests.length > 0) {
            this.updateNewRequests(nextRequests);
        }
    }

    handleChangeNumber(requestId, newNumber) {
        let nextRequests = this.state.session.requests.map(r => {
            if (r.Id == requestId) {
                r.Number = newNumber;
            }

            return r;
        });

        if (nextRequests.length > 0) {
            this.updateNewRequests(nextRequests);
        }
    }

    handleAddNewRequest() {
        let newRequest = {
            Id: utility.GenerateUUID()
        };

        this.setState((currentState) => {
            let nextRequests = _.concat([], currentState.session.requests);
            nextRequests.push(newRequest);
            let nextSession = currentState.session;
            nextSession.requests = nextRequests;

            return {
                session: nextSession
            };
        });
    }

    handleDeleteRequest(requestId) {
        this.setState((currentState) => {
            let nextRequests = _.concat([], currentState.session.requests);
            let selectedRequest = nextRequests.find(t => t.Id == requestId);
            let deletedIndex = nextRequests.indexOf(selectedRequest);
            if (deletedIndex > -1) {
                nextRequests.splice(deletedIndex, 1);
            }

            let nextSession = currentState.session;
            nextSession.requests = nextRequests;

            return {
                session: nextSession
            };
        });
    }

    render() {
        return (
            <div className='session-plan-detail-containter'>
                <div className='request-container'>
                    <Scrollbars style={{ height: 1200 }}>
                        <RequestDetailList requestDetails={this.state.session.requests}
                            onChangeTitle={this.handleChangeTitle}
                            onChangeSkill={this.handleChangeSkill}
                            onChangeNumber={this.handleChangeNumber}
                            onDeleteRequest={this.handleDeleteRequest} />
                        <button className="w3-btn w3-blue handle-btn" onClick={this.handleAddNewRequest}>Add new request</button>
                        <button className="w3-btn w3-blue handle-btn">View suggestion</button>
                    </Scrollbars>
                </div>
                <div className='request-result-container'>
                    <Scrollbars style={{ height: 1200 }}>
                        <RequestDetailResultList
                            employeeResults={this.state.employeeResults}
                        />
                    </Scrollbars>
                </div>
            </div>
        )
    }
}
