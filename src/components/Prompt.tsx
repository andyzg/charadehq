import React from 'react'
import { connect } from 'react-redux'

class Prompt extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitPrompt(this.state.value)
  }

  render() {
    if (!this.props.showPrompt) {
      return null;
    }

    return (
      <div className="prompt">
        Prompt
        <div className="input-group mb-3">
          <input type="text" placeholder="How many times did you...?" className="form-control" value={this.state.value} onChange={this.handleChange} aria-label="Message" aria-describedby="Input for prompt" />
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="button-primary btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Prompt
