import React from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import ParticipantViewContainer from '../containers/ParticipantViewContainer'
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

    for (let i in this.props.participants) {
      list.push(
        <ParticipantViewContainer participantUUID={i} key={i} />
      )
    }

    console.log('Show role info');
    return (
      <div className="participant-list">
        {list}
      </div>
    );
  }
}

export default ParticipantList
