import React from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/index'

class NameInput extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: 'waz good'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(setName(this.state.value));
  }

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect()(NameInput)
