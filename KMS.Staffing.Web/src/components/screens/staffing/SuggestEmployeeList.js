import React, { Component } from 'react';
import SuggestEmployee from './SuggestEmployee';
import _ from 'lodash/fp';

export default class SuggestEmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestEmployees: [],
        };
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({ suggestEmployees: nextProps.suggestEmployees })
    }

    render() {
        const details = this.state.suggestEmployees.map(result => {
            if (result) {
                return <SuggestEmployee key={result.Id}
                                        suggestEmployee={result} />
            }
        });
        return (
            <div>
                {details}
            </div>
        )
    }
}
