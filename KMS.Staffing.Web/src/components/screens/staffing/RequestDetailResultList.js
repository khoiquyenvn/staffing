import React, { Component } from 'react';
import RequestDetailResult from './RequestDetailResult';
import _ from 'lodash/fp';

export default class RequestDetailResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeResults: [],
        };
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ employeeResults: nextProps.employeeResults })
    }

    render() {
        const details = this.state.employeeResults.map(result => {
            return <RequestDetailResult key={result.Id}
                                        employeeResult={result} />
        });
        return (
            <div>
                {details}
            </div>
        )
    }
}
