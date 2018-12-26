import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const projectShortInformation = [{
    Header: 'Name',
    accessor: 'name'
  }, {
    Header: 'Description',
    accessor: 'description'
  }, {
    Header: 'Team Size',
    accessor: 'teamSize'
  }, {
    Header: 'Status',
    accessor: 'status',
    Cell: row => (
      <label className='statusLable' style={{...renderStyle(row.value), ...statusLabel}}>{renderName(row.value)}</label>  // label change with value
        )
  }, {
    Header: '',
    accessor: '',
    Cell: row => (
      <button className="staffingButton"><FaBookReader/> View </button>
        )
  }]

var statusLabel = {
  padding: '5px',
  borderRadius: '10px',
  font: 'Arial',
  textAlign: 'center',
  display: 'inline-block'
}

var workingStatusLabelStyle = {
  color: 'white',
  background: '#800000',
}

var kickoffStatusLabelStyle = {
  color: 'white',
  background: '#008080'
}

var doneStatusLabelStyle = {
  color: 'white',
  background: '#800080'
}

function renderStyle(projectModelStatus) {
  switch(projectModelStatus) {
    case projectStatusEnum.working: return workingStatusLabelStyle;
    case projectStatusEnum.kickoff: return kickoffStatusLabelStyle;
    case projectStatusEnum.done: return doneStatusLabelStyle;
  }
}

function renderName(projectModelStatus) {
  switch(projectModelStatus) {
    case projectStatusEnum.working: return 'Working';
    case projectStatusEnum.kickoff: return 'Preparing';
    case projectStatusEnum.done: return 'End';
  }
}

export default projectShortInformation