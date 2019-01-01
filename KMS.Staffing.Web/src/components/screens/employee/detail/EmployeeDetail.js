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

class EmployeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            tabIndex: 0,
            isEditting: true
        };

        this.updateEmployeeInformation = this.updateEmployeeInformation.bind(this);
    }

    componentDidMount() {
        this.props.selectedEmployeeActions.loadEmployeeById();
        this.props.titleActions.loadTitles();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ employee: nextProps.selectedEmployee })
    }

    updateEmployeeInformation(event) {
        const field = event.target.name;
        const emp = this.state.employee;
        emp[field] = event.target.value;
        return this.setState({ employee: emp });
    }

    render() {
        if (this.state.employee.Id) {
            return (
                <Fragment>
                    <EmployeeAvatar image={this.state.employee.PhotoURL} />
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
                </Fragment>
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