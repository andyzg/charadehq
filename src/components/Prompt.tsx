import React from 'react'
import { connect } from 'react-redux'

class Prompt extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  }

  render() {
    return (
      <div className="prompt">
        Prompt
      </div>
    );
  }
}

export default Prompt
