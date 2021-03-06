import React from 'react'
import profile from '../util/profile'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import { VOTE } from '../models/FakerState'
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
        <div className={'participant-view__status' + (isMe ? ' button-primary' : '')}>
          {this.props.participant.status}
        </div>
      );
    }

    let votes = []
    if (this.props.participant.votes) {
      for (let i in this.props.participant.votes) {
        votes.push(
          <div key={i}>
            {this.props.names[i]}
          </div>
        );
      }
    }

    return (
      <div className="participant-view">
        {statusBar}
        <div className="participant-view__row">
          <div className="participant-view__avatar" style={style}>
          </div>
          <span className="participant-view__name">{(isMe ? '(You) ' : '') + this.props.participant.name}</span>
          </div>
          {(!isMe && this.props.gameState === VOTE) ? (<div onClick={this.handleClick} className={'button-small button-primary participant-view__vote-button'}>
            Vote
          </div>) : null}
          {votes.length > 0 ? <span className="participant-view__votes-title">Votes:</span> : null}
          <div className="participant-view__voted-box">

            {votes}
          </div>
      </div>
    );
  }
}

export default ParticipantView
