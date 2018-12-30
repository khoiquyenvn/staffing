import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../../actions/projectActions';
import ProjectList from './ProjectList';

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);        
    }

    componentDidMount() {
        this.props.projectActions.loadProjects();
    }

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

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);