import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ProjectPage = ({projects}) => {
    <div>
        <h1>Projects</h1>
        <div>
            <ReactTable
                  data={projects}
                  columns={projectShortInformation}
                  defaultPageSize={10}
            />
        </div>
    </div>
}

function mapStateToProps(state) {
    return {
        projects: state.projects
    };
}

export default connect(mapStateToProps)(ProjectPage);