import React from 'react'

class Input extends React.Component<any, any> {
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
    this.props.submit(this.state.value)
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    return (
      <div className="prompt">
        <div className="input-group mb-3">
          <input type="text" placeholder={this.props.placeholder} className="form-control" value={this.state.value} onChange={this.handleChange} aria-label="Message" aria-describedby="Input for prompt" />
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="button-primary btn btn-outline-secondary" type="button">{this.props.submitText}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Input
