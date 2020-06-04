import React from 'react'
import profile from '../util/profile'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import './ParticipantView.css'

class ParticipantView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let isMe = this.props.myUUID === this.props.participant.uuid;
    if (!isMe) {
      this.props.setVote(this.props.participant.uuid);
    } else {
    }
  }

  render() {
    let isMe = this.props.myUUID === this.props.participant.uuid;
    let style = null;
    if (this.props.voted === this.props.participant.uuid) {
      style = {backgroundColor: '#09f'};
    }

    let statusBar = null;
    if (this.props.participant.status) {
      statusBar = (
        <div className='participant-view__status'>
          {this.props.participant.status}
        </div>
      );
    }

    return (
      <div onClick={this.handleClick} className="participant-view">
        {statusBar}
        <div className="participant-view__row">
          <div className="participant-view__avatar" style={style}>
          </div>
          <span className="participant-view__name">{(isMe ? '(You) ' : '') + this.props.participant.name}</span>
          </div>
          <div className="participant-view__voted-box">
          </div>
      </div>
    );
  }
}

export default ParticipantView
