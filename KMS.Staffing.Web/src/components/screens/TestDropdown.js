import React from 'react';
import Select from 'react-select';

const options = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
];

export default class TestDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedOption: [{ value: 1, label: '' }],
          }
          this.handleChange=this.handleChange.bind(this);
    }

  
  handleChange(selectedOption) {
    this.setState({ selectedOption });    
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}