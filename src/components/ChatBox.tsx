import React from 'react'
import profile from '../util/profile'
import socket from '../socket-connection'
import { connect } from 'react-redux'
import './ChatBox.css';

class ChatBox extends React.Component<any, any> {
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
    console.log('Emitting message');
    socket.emit('message', {
      message: this.state.value,
      uuid: profile.getUUID()
    });
  }

  render() {
    let messageElements = []
    for (let i = 0; i < this.props.messages.length; i++) {
      messageElements.push(
        <li key={i}> {this.props.messages[i]} </li>
      )
    }

    return (
      <div className="chatbox">
        <br /> <br />
        Chat box:
        <ul className="chatbox__message-list">{messageElements}</ul>

        <div className="chatbox__input input-group mb-3">
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} aria-label="Message" aria-describedby="Input for message" />
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="button-primary btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>

      </div>
    );
  }
}

export default ChatBox
