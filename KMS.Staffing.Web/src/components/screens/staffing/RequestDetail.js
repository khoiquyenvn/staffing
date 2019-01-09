import React, { Component } from 'react';
import TitleDropdown from '../common/TitleDropdown';
import CompetentLevelDropdown from '../common/CompetentLevelDropdown';
import SkillDropdown from '../common/SkillDropdown';
import TextInput from '../../controls/common/TextInput';
import _ from 'lodash/fp';

import '../../../styles/staffing/sessionPlanDetail.css';
import '../../../styles/common/common.css';

import deleteIcon from '../../../../resources/photo/delete.jpg';
import { FaTrash } from 'react-icons/fa';

export default class RequestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                background: '#F2F2F2'
            }
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this);
        this.handleOnChangeSkill = this.handleOnChangeSkill.bind(this);
        this.handleOnChangeNumber = this.handleOnChangeNumber.bind(this);
        this.handleOnDeleteRequest = this.handleOnDeleteRequest.bind(this);
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let backgroundColor = nextProps.isSelected ? '#ff9900' : '#F2F2F2';
        return ({
            style: {
                background: backgroundColor
            }
        })
    }

    handleSelect() {
        this.props.onSelectRequest(this.props.id);
    }

    handleOnChangeTitle(event) {
        let newTitleId = event.value;
        this.props.onChangeTitle(this.props.id, newTitleId);
    }

    handleOnChangeSkill(event) {
        let selectedSkills = "";

        for (let i = 0; i < event.length; i++) {
            selectedSkills = selectedSkills + event[i].value + ";#";
        }

        selectedSkills = selectedSkills.substr(0, selectedSkills.length-2);

        this.props.onChangeSkill(this.props.id, selectedSkills);
    }

    handleOnChangeNumber(event) {
        this.props.onChangeNumber(this.props.id, event.target.value);
    }

    handleOnDeleteRequest(event) {
        this.props.onDeleteRequest(this.props.id);    
        event.stopPropagation();
    }

    render() {
        return (
            <div className="request-card" style={this.state.style} onClick={this.handleSelect}>                
                <table className="request-detail-container">
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>
                                <TitleDropdown
                                    name="TitleId"
                                    label="Title"
                                    selectedValue={this.props.titleId}
                                    isEditting={true}
                                    onlyInput={true}
                                    onChange={this.handleOnChangeTitle} />
                            </td>
                        </tr>
                        <tr>
                            <td>Skill</td>
                            <td>
                                <SkillDropdown
                                    name="SkillId"
                                    label="Skill"
                                    selectedValue={this.props.skills}
                                    isEditting={true}
                                    isSearchable={true}
                                    isMulti={true}
                                    onChange={this.handleOnChangeSkill} />
                            </td>
                        </tr>
                        <tr>
                            <td>Number</td>
                            <td>
                                <TextInput
                                    name="Number"
                                    label="Number"
                                    value={this.props.number}
                                    isEditting={true}
                                    onlyInput={true}
                                    onChange={this.handleOnChangeNumber} />
                            </td>
                        </tr>
                    </tbody>
                </table>                
                <div className="handle-btn-container"><button className="w3-btn w3-orrange" onClick={this.handleOnDeleteRequest}><FaTrash/></button></div>
            </div>
        )
    }
}
