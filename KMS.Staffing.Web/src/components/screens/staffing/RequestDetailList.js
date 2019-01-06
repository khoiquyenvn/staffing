import React, { Component } from 'react';
import RequestDetail from './RequestDetail';
import _ from 'lodash/fp';

export default class RequestDetailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestDetails: [],            
        };

        this.handleSelectRequest = this.handleSelectRequest.bind(this);
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ requestDetails: nextProps.requestDetails })
    }

    handleSelectRequest(requestId){
        if (this.state.requestDetails.length > 0) {
            let requests = _.concat([], this.state.requestDetails)
            let updatedRequests = requests.map(request =>{
                if (request.Id == requestId) {
                    request.IsSelected = true;
                } else {
                    request.IsSelected = false;
                }

                return request;
            });

            this.setState((currentState) => {                
                return {
                    requestDetails: updatedRequests,
                    selectedRequestId: requestId
                }
            });
        }

        this.props.onSelectRequest(requestId);
    }

    render() {
        const details = this.state.requestDetails.map(detail => {
            return <RequestDetail key={detail.Id}
                                  id={detail.Id}
                                  isSelected={detail.IsSelected}
                                  titleId={detail.TitleId}
                                  skills={detail.Skills}
                                  competentLevelId={detail.CompetentLevelId}
                                  number={detail.Number}
                                  onSelectRequest={this.handleSelectRequest}
                                  onChangeTitle={this.props.onChangeTitle}
                                  onChangeSkill={this.props.onChangeSkill}
                                  onChangeNumber={this.props.onChangeNumber}
                                  onDeleteRequest={this.props.onDeleteRequest} />
        });
        return (
            <div>
                {details}
            </div>
        )
    }
}
