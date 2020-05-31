import React from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import ParticipantView from './ParticipantView'
import './ParticipantList.css'

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
    console.log(participants);

    let list = [];

    for (let i = 0; i < this.props.participants.length; i++) {
      list.push(
        <ParticipantView participant={this.props.participants[i]} key={i} />
      )
    }

    return (
      <div className="participant-list">
        {list}
      </div>
    );
  }
}

export default ParticipantList
