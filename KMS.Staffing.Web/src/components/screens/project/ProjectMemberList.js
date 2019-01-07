import React, { Component , Fragment} from 'react'
import * as projectDetailActions from '../../../actions/projectDetailAction';
import { connect } from 'react-redux';
import { renderName } from '../../../models/ProjectModel';
import { bindActionCreators } from 'redux';
import TextInput from '../../controls/common/TextInput';
import { EmployeeMenu, ArrowLeft, ArrowRight } from './ProjectMember';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";


class ProjectMemberList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: 0
            };
            
    }
    
    onSelect(key) {
        this.setState({ selected: key });
    }
    
    componentDidMount() {
        this.props.projectDetailActions.loadMemberList(this.props.projectDetail.Id);
        }


    render() {
        
        const { selected } = this.state;
        const member = this.props.projectDetail.Member;
        return (
        <div>
        {
            member.map(function(memberListOfEachPosition,idx){
                var position = memberListOfEachPosition[0].Position;
                // Create menu from items
                const employeeMenu = EmployeeMenu(memberListOfEachPosition, selected);
                return (
                    <Card key={idx}>
                        <CardHeader style={{color:'white', background:'#373a47', fontSize: '20px'}} >{position.PositionShortName} ({memberListOfEachPosition.length})</CardHeader>
                        <CardBody><ScrollMenu alignCenter={false}
                            data={employeeMenu}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}
                            selected={selected}
                        />
                        </CardBody>
                        
                    </Card>
                )
            }, this)
            
        }
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
  projectDetail: state.projectDetail
})

function mapDispatchToProps(dispatch) {
  return {
    projectDetailActions: bindActionCreators(projectDetailActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemberList)