import React from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/index'

class ParticipantList extends React.Component<any, any> {
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
    let participants = this.props.participants;

    return (
      <div className="">
        {JSON.stringify(this.props.participants)}
      </div>
    );
  }
}

export default ParticipantList
