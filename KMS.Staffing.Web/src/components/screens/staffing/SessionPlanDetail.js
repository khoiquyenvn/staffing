import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderStatusLabel } from '../../../models/ProjectModel';
import * as ModelUtility from '../../../models/ModelUtility';
import * as utility from '../../../utility/uuidUtility';
import RequestDetailList from './RequestDetailList';
import RequestDetailResult from './RequestDetailResult';
import SuggestEmployee from './SuggestEmployee';
import { Scrollbars } from 'react-custom-scrollbars';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import projectApi from '../../../api/projectApi';

import _ from 'lodash/fp';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/staffingCardHeader.css';
import '../../../styles/common/common.css';
import StaffingPageHeader from '../../controls/common/StaffingPageHeader';
import cardStyles from '../../../styles/common/staffingCardHeader.css';
import { FaPlus, FaBookReader } from 'react-icons/fa';

export default class SessionPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffingResults: [],
            session: {},
            employeeResults: [],
            employeesByRequest: []
        };

        this.updateNewRequests = this.updateNewRequests.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleAddNewRequest = this.handleAddNewRequest.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.handleSelectRequest = this.handleSelectRequest.bind(this);
        this.handleViewSuggestion = this.handleViewSuggestion.bind(this);
        this.removeEmployeeByRequestId = this.removeEmployeeByRequestId.bind(this);
        this.handleDragAndDrop = this.handleDragAndDrop.bind(this);
        this.reorderItemsInList = this.reorderItemsInList.bind(this);
        this.getListItemsByStateId = this.getListItemsByStateId.bind(this);
        this.moveItemsAmongList = this.moveItemsAmongList.bind(this);
        this.generateRequestDetailByRequest = this.generateRequestDetailByRequest.bind(this);
        this.generatePostRequest = this.generatePostRequest.bind(this);
        this.handleRemoveAlreadySelectedEmployee = this.handleRemoveAlreadySelectedEmployee.bind(this);
        this.handleSelectedEmployeesAfterDragAndDrop = this.handleSelectedEmployeesAfterDragAndDrop.bind(this);
    }

    componentDidMount() {
        const sessionPlanId = this.props.match.params.sessionPlanId;

        if (sessionPlanId) {
            projectApi.loadRequestsBySession(sessionPlanId).then(nextSession => {
                this.setState((currentState) => {
                    return {
                        session: nextSession
                    };
                });
            }).catch(error => {
                throw (error);
            });
        }
    }

    updateNewRequests(newRequests) {
        this.setState((currentState) => {
            let nextSession = currentState.session;
            nextSession.Requests = newRequests;

            return {
                session: nextSession
            };
        });
    }

    handleChangeTitle(requestId, titleId) {
        let nextRequests = this.state.session.Requests.map(r => {
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
        let nextRequests = this.state.session.Requests.map(r => {
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
        let nextRequests = this.state.session.Requests.map(r => {
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
            let nextRequests = [newRequest, ...currentState.session.Requests];
            let nextSession = currentState.session;
            nextSession.Requests = nextRequests;

            return {
                session: nextSession
            };
        });
    }

    removeEmployeeByRequestId(employees, requestId) {
        let nextEmployees = _.concat([], employees);

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].RequestId == requestId) {
                let deletedIndex = nextEmployees.indexOf(employees[i]);

                if (deletedIndex > -1) {
                    nextEmployees.splice(deletedIndex, 1);
                }
            }
        }

        return nextEmployees;
    }

    handleDeleteRequest(requestId) {
        this.setState((currentState) => {
            let nextRequests = _.concat([], currentState.session.Requests);
            let selectedRequest = nextRequests.find(t => t.Id == requestId);
            let deletedIndex = nextRequests.indexOf(selectedRequest);
            if (deletedIndex > -1) {
                nextRequests.splice(deletedIndex, 1);
            }

            let nextSession = currentState.session;
            nextSession.Requests = nextRequests;

            return {
                session: nextSession,
            };
        });
    }

    generateRequestDetailByRequest(request) {
        let requestDetails = [{
            TitleId: request.TitleId,
            CompetentLevelId: '0e3b823e-a2a7-4a50-8edf-d29bd7a20231',
            RequestId: request.Id
        }];

        if (request.Skills && request.Skills != '') {
            let selectedSkillIds = request.Skills.split(";#");

            requestDetails = selectedSkillIds.map(s => {
                return {
                    TitleId: request.TitleId,
                    CompetentLevelId: '0e3b823e-a2a7-4a50-8edf-d29bd7a20231',
                    RequestId: request.Id,
                    SkillId: s
                }
            });

        }

        return requestDetails
    }

    generatePostRequest(request) {
        let requestType = 0;

        if ((!request.TitleId || request.TitleId == '' || request.TitleId == ModelUtility.EmptyGuid) && (request.Skills != '')) {
            requestType = 1;
        }
        else if ((request.TitleId != '' && request.TitleId != ModelUtility.EmptyGuid) && (request.Skills != '')) {
            requestType = 2;
        }

        let requestDetails = this.generateRequestDetailByRequest(request);

        return {
            Id: request.Id,
            Type: requestType,
            Number: request.Number,
            SessionPlanId: this.state.session.Id,
            RequestDetails: requestDetails,
            Status: 1
        }
    }

    handleViewSuggestion() {
        if (this.state.session && this.state.session.Requests.length > 0) {

            let requests = this.state.session.Requests.map(r => {
                return this.generatePostRequest(r);
            });

            let sessionRequest = {
                Id: this.state.session.Id,
                Requests: requests
            }

            projectApi.getSuggestArrangement(sessionRequest).then(result => {
                let staffs = _.concat([], result.Result);
                let suggestEmployees = _.concat([], result.Result);

                this.setState((currentState) => {
                    let nextRequests = _.concat([], currentState.session.Requests);
                    nextRequests = nextRequests.map(r => {
                        r.IsSelected = false;
                        return r;
                    });

                    let nextSession = currentState.session;
                    nextSession.Requests = nextRequests;

                    return {
                        staffingResults: staffs,
                        employeeResults: suggestEmployees,
                        session: nextSession,
                        employeesByRequest: []
                    }
                });
            }).catch(error => {
                throw (error);
            });
        }
    }

    handleRemoveAlreadySelectedEmployee(selected, suggested) {
        let suggestedEmployees = _.concat([], suggested);

        if (selected.length > 0 && suggested.length > 0) {
            for (let i = 0; i < selected.length; i++) {
                let selectedEmp = suggested.find(e => e.Id == selected[i].Id);
                let deletedIndex = suggestedEmployees.indexOf(selectedEmp);
                if (deletedIndex > -1) {
                    suggestedEmployees.splice(deletedIndex, 1);
                }
            }
        }
        return suggestedEmployees;
    }

    handleSelectRequest(requestId) {
        let employeesByRequest = ModelUtility.getSuggestedEmployeeByRequest(requestId);
        if (this.state.session) {
            let selectedRequest = this.state.session.Requests.find(r => r.Id == requestId);

            if (selectedRequest.IsSelected) {
                projectApi.findEmployeesForRequest(this.generatePostRequest(selectedRequest)).then(result => {
                    let employeesByRequest = _.concat([], result.Result);

                    this.setState((currentState) => {
                        let nextEmployeeResults = _.concat([], currentState.staffingResults);
                        nextEmployeeResults = currentState.staffingResults.filter(s => {
                            if (s.MatchedResult.MatchedRequest == requestId) {
                                return s;
                            }
                        });

                        employeesByRequest = this.handleRemoveAlreadySelectedEmployee(nextEmployeeResults, employeesByRequest);

                        return {
                            employeeResults: nextEmployeeResults,
                            employeesByRequest: employeesByRequest
                        }
                    });
                }).catch(error => {
                    throw (error);
                });
            }
            else {
                this.setState((currentState) => {
                    let suggestStaffsResult = currentState.staffingResults;

                    return {
                        employeeResults: suggestStaffsResult,
                        employeesByRequest: []
                    };
                });
            }
        }
    }

    reorderItemsInList(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    getListItemsByStateId(stateId) {
        if (stateId == "resultStaffing") {
            return _.concat([], this.state.employeeResults);
        }
        if (stateId == "suggestEmployee") {
            return _.concat([], this.state.employeesByRequest);
        }
        return [];
    }

    moveItemsAmongList(source, destination, droppableSource, droppableDestination) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }

    handleSelectedEmployeesAfterDragAndDrop(allSelectedEmps, selectedEmpsByRequest) {
        let currentStaffingResults = _.concat([], this.state.staffingResults);

        if (selectedEmpsByRequest.length > 0) {
            let allUnselectRequest = this.state.session.Requests.every(r => {
                return !r.IsSelected;
            });

            // Check if there is a selected request
            if (!allUnselectRequest) {
                let selectedRequestId = selectedEmpsByRequest[0].MatchedResult.MatchedRequest;
                let currentEmpsByRequest = allSelectedEmps.filter(emp => {
                    if (emp.MatchedResult.MatchedRequest == selectedRequestId) {
                        return emp;
                    }
                })

                for (let i = 0; i < currentEmpsByRequest.length; i++) {
                    currentStaffingResults.splice(currentStaffingResults.indexOf(currentEmpsByRequest[i]), 1);
                }

                for (let i = 0; i < selectedEmpsByRequest.length; i++) {
                    currentStaffingResults.push(selectedEmpsByRequest[i]);
                }
            }
            else {
                currentStaffingResults = selectedEmpsByRequest;
            }

            this.setState((currentState) => {
                return {
                    staffingResults: currentStaffingResults
                }
            });
        }
    }

    handleDragAndDrop(result) {
        const { source, destination } = result;
        let currentStaffingResults = this.state.staffingResults;

        if (!destination) {
            return;
        }

        // drag and drop inside 1 list
        if (source.droppableId == destination.droppableId) {
            const items = this.reorderItemsInList(
                this.getListItemsByStateId(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'resultStaffing') {                
                this.setState((currentState) => {
                    
                    return {
                        employeeResults: items,
                        staffingResults: nextAllStaffing
                    }
                });

                this.handleSelectedEmployeesAfterDragAndDrop(currentStaffingResults, items);
            }
            if (source.droppableId === 'suggestEmployee') {
                this.setState((currentState) => {
                    return {
                        employeesByRequest: items
                    }
                });
            }
        }
        else {
            const result = this.moveItemsAmongList(
                this.getListItemsByStateId(source.droppableId),
                this.getListItemsByStateId(destination.droppableId),
                source,
                destination
            );

            this.setState((currentState) => {
                return {
                    employeeResults: result.resultStaffing,
                    employeesByRequest: result.suggestEmployee
                }
            });

            this.handleSelectedEmployeesAfterDragAndDrop(currentStaffingResults, result.resultStaffing);
        }
    }

    render() {

        if (!this.state.session) {
            return <div className='session-plan-detail-containter'>
                Loading...
                   </div>
        }

        let numberOfRequests = (this.state.session.Requests) ? this.state.session.Requests.length : 0;
        let arrangedStaffs = this.state.employeeResults.length;
        let suggestedEmployeeByRequest = this.state.employeesByRequest.length;

        return (
            <div>
                <StaffingPageHeader title='Session Plan' />
                <button className="w3-btn w3-green handle-btn" onClick={this.handleAddNewRequest}><FaPlus />  Add new request</button>
                <button className="w3-btn w3-blue handle-btn" onClick={this.handleViewSuggestion}><FaBookReader />  View suggestion</button>
                <div className='session-plan-detail-containter'>
                    <Card className='request-container'>
                        <CardHeader>Requests: {numberOfRequests}</CardHeader>
                        <CardBody>
                            <Scrollbars style={{ height: 1000 }}>
                                <RequestDetailList requestDetails={this.state.session.Requests}
                                    onChangeTitle={this.handleChangeTitle}
                                    onChangeSkill={this.handleChangeSkill}
                                    onChangeNumber={this.handleChangeNumber}
                                    onDeleteRequest={this.handleDeleteRequest}
                                    onSelectRequest={this.handleSelectRequest} />
                            </Scrollbars>
                        </CardBody>
                    </Card>
                    <DragDropContext onDragEnd={this.handleDragAndDrop}>
                        <Card className='request-result-container'>
                            <CardHeader>Selected Employees: {arrangedStaffs}</CardHeader>
                            <CardBody>
                                <Scrollbars style={{ height: 1000 }}>
                                    <Droppable droppableId="resultStaffing">
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} className="droppable-container">
                                                {
                                                    this.state.employeeResults.map((result, index) => {
                                                        if (result) {
                                                            return <Draggable key={result.Id}
                                                                draggableId={result.Id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}>
                                                                        <RequestDetailResult key={result.Id}
                                                                            employeeResult={result} />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        }
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Scrollbars>
                            </CardBody>
                        </Card>
                        <Card className='suggest-container'>
                            <CardHeader>Suggestion Employees: {suggestedEmployeeByRequest}</CardHeader>
                            <CardBody>
                                <Scrollbars style={{ height: 1000 }}>
                                    <Droppable droppableId="suggestEmployee">
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} className="droppable-container">
                                                {
                                                    this.state.employeesByRequest.map((result, index) => {
                                                        if (result) {
                                                            return <Draggable key={result.Id}
                                                                draggableId={result.Id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}>
                                                                        <SuggestEmployee key={result.Id}
                                                                            suggestEmployee={result} />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        }
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Scrollbars>
                            </CardBody>
                        </Card>
                    </DragDropContext>

                </div>
            </div>
        )
    }
}

