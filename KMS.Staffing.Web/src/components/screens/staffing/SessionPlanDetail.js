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
import _ from 'lodash/fp';

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';

export default class SessionPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffingResults: [],
            session: {
                Id: utility.GenerateUUID(),
                requests: [
                    {
                        Id: '82e8f005-00db-4954-a1de-d6e43baaa001',
                        TitleId: '82e8f005-00db-4954-a1de-d6e43b037001',
                        Number: 2
                    },
                    {
                        Id: '82e8f005-00db-4954-a1de-d6e43baaa002',
                        TitleId: '82e8f005-00db-4954-a1de-d6e43b037002',
                        Skills: '120e768d-1ffd-4bfc-be39-ab23170bda72;#120e768d-1ffd-4bfc-be39-ab23170bda74',
                        CompetentLevelId: '0e3b823e-a2a7-4a50-8edf-d29bd7a20234',
                        Number: 2
                    }
                ]
            },
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
            let nextRequests = _.concat([], currentState.session.requests);
            let selectedRequest = nextRequests.find(t => t.Id == requestId);
            let deletedIndex = nextRequests.indexOf(selectedRequest);
            if (deletedIndex > -1) {
                nextRequests.splice(deletedIndex, 1);
            }

            let nextSession = currentState.session;
            nextSession.requests = nextRequests;

            return {
                session: nextSession,
            };
        });
    }

    handleViewSuggestion() {
        let staffs = ModelUtility.getStaffingResults();
        let suggestEmployees = _.concat([], staffs);

        this.setState((currentState) => {
            let nextRequests = _.concat([], currentState.session.requests);
            nextRequests = nextRequests.map(r => {
                r.IsSelected = false;
                return r;
            });

            let nextSession = currentState.session;
            nextSession.requests = nextRequests;

            return {
                staffingResults: staffs,
                employeeResults: suggestEmployees,
                session: nextSession
            }
        });
    }

    handleSelectRequest(requestId) {
        let employeesByRequest = ModelUtility.getSuggestedEmployeeByRequest(requestId);

        this.setState((currentState) => {
            let nextEmployeeResults = _.concat([], currentState.staffingResults);
            nextEmployeeResults = currentState.staffingResults.map(s => {
                if (s.RequestId == requestId) {
                    return s;
                }
            });

            return {
                employeeResults: nextEmployeeResults,
                employeesByRequest: employeesByRequest
            }
        });
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

    handleDragAndDrop(result) {
        const { source, destination } = result;

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
                        employeeResults: items
                    }
                });
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
        }
    }

    render() {
        return (
            <div className='session-plan-detail-containter'>
                <div className='request-container'>
                    <h3>Requests</h3>
                    <Scrollbars style={{ height: 1200 }}>
                        <RequestDetailList requestDetails={this.state.session.requests}
                            onChangeTitle={this.handleChangeTitle}
                            onChangeSkill={this.handleChangeSkill}
                            onChangeNumber={this.handleChangeNumber}
                            onDeleteRequest={this.handleDeleteRequest}
                            onSelectRequest={this.handleSelectRequest} />
                        <button className="w3-btn w3-blue handle-btn" onClick={this.handleAddNewRequest}>Add new request</button>
                        <button className="w3-btn w3-blue handle-btn" onClick={this.handleViewSuggestion}>View suggestion</button>
                    </Scrollbars>
                </div>

                <DragDropContext onDragEnd={this.handleDragAndDrop}>
                    <div className='request-result-container'>
                        <h3>Selected Employees</h3>
                        <Scrollbars style={{ height: 1200 }}>
                            <Droppable droppableId="resultStaffing">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}>
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
                    </div>
                    <div className='suggest-container'>
                        <h3>Suggestion Employees</h3>
                        <Scrollbars style={{ height: 1200 }}>
                            <Droppable droppableId="suggestEmployee">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}>
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
                    </div>
                </DragDropContext>

            </div>
        )
    }
}

