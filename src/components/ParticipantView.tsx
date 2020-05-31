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
    let isMe = profile.getName() === this.props.participant;
    console.log(this.props.participant);

    return (
      <div className="participant-view">
        <div className="participant-view__avatar">
        </div>
        {(isMe ? '(You) ' : '') + this.props.participant}
      </div>
    );
  }
}

export default ParticipantList

