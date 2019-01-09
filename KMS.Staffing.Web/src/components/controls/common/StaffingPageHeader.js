import React, { Component, Fragment } from 'react';
import { PageHeader } from 'react-bootstrap';

export default class StaffingPageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title = this.props.title === undefined ? '' : this.props.title;

        return (
            <div className='pb-2 mb-2 border-bottom'>
                <PageHeader className="w3-text-blue-grey">
                    {title} 
                </PageHeader>
            </div>
        );
    }
}