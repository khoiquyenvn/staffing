import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ProjectList from './ProjectList';

class ProjectPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Projects</h1>
                <div>
                    <ProjectList projects={this.props.projects} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        projects: state.projects
    };
}

export default connect(mapStateToProps)(ProjectPage);