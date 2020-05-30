import React from 'react'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import './ParticipantView.css'

class ParticipantList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: 'waz good'};
  }

  render() {
    return (
      <div className="participant-view">
        <div className="participant-view__avatar">
        </div>
        {this.props.participant}
      </div>
    );
  }
}

export default ParticipantList

