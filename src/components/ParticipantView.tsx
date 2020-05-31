import React from 'react'
import profile from '../util/profile'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import './ParticipantView.css'

class ParticipantList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: 'waz good'};
  }

  render() {
    let isMe = profile.getUUID() === this.props.participant.uuid;

    return (
      <div className="participant-view">
        <div className="participant-view__avatar">
        </div>
        {(isMe ? '(You) ' : '') + this.props.participant.name}
      </div>
    );
  }
}

export default ParticipantList

