import React, { Component, Fragment, PropTypes } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import employeeApi from '../../../../api/employeeApi';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectedEmployeeActions from '../../../../actions/selectedEmployeeActions';
import * as titleActions from '../../../../actions/titleActions';
import EmployeeAvatar from './EmployeeDetail.Avatar';
import EmployeeInformation from './EmployeeDetail.Information';
import EmployeeSkillset from './EmployeeDetail.Skillset';
import 'react-tabs/style/react-tabs.css';

import '../../../../styles/employee/employeeDetail.css'; 

class EmployeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            tabIndex: 0,
            isEditting: false
        };

        this.updateEmployeeInformation = this.updateEmployeeInformation.bind(this);
        this.toggleEditting = this.toggleEditting.bind(this);
        this.saveEmployeeInformation = this.saveEmployeeInformation.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.selectedEmployeeActions.loadEmployeeById(id);
        this.props.titleActions.loadTitles();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ employee: nextProps.selectedEmployee })
    }

    updateEmployeeInformation(event) {
        const field = event.target.name;
        const emp = this.state.employee;
        emp[field] = event.target.value;
        this.setState({ employee: emp });
    }

    toggleEditting(event) {
        this.setState((currentState) => {
            let currentEditState = currentState.isEditting;

            return {
                isEditting: !currentEditState
            };
        });
    }

    saveEmployeeInformation() {
        let updatedEmployee = Object.assign({}, this.state.employee);
        this.props.selectedEmployeeActions.updateEmployee(updatedEmployee);
    }

    render() {

        if (this.state.employee.Id) {
            return (
                <div className='employee-detail-containter'>
                    <div className='employee-avatar-container'>
                        <EmployeeAvatar image={this.state.employee.PhotoURL} />
                    </div>
                    <div className='employee-information-container'>
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                            <TabList>
                                <Tab>Information</Tab>
                                <Tab>Skillset</Tab>
                            </TabList>
                            <TabPanel>
                                <EmployeeInformation onChangeInformation={this.updateEmployeeInformation}
                                    employee={this.state.employee}
                                    isEditting={this.state.isEditting}
                                    titles={this.props.titles} />
                            </TabPanel>
                            <TabPanel>
                                <EmployeeSkillset employee={this.state.employee}
                                    isEditting={this.state.isEditting} />
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="employee-detail-btn-container">
                        <button className="w3-btn w3-blue employee-handle-btn" hidden={this.state.isEditting} onClick={this.toggleEditting}>Edit</button>
                        <button className="w3-btn w3-blue employee-handle-btn" hidden={!this.state.isEditting} onClick={this.saveEmployeeInformation}>Save</button>
                        <button className="w3-btn w3-blue employee-handle-btn" hidden={!this.state.isEditting} onClick={this.toggleEditting}>Cancel</button>
                    </div>
                </div>
            )
        }
        return <div>Loading ...</div>
    }
}

function mapStateToProps(state, ownProps) {
    return {
        selectedEmployee: state.selectedEmployee,
        titles: state.titles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectedEmployeeActions: bindActionCreators(selectedEmployeeActions, dispatch),
        titleActions: bindActionCreators(titleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);