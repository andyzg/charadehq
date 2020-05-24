import React from 'react'
import socket from '../socket-connection'
import { connect } from 'react-redux'

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
    socket.emit('message', this.state.value);
  }

  render() {
    let messageElements = []
    for (let i of this.props.messages) {
      messageElements.push(
        <li> {i} </li>
      )
    }

    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        </form>
        <ul id='chat-box'>{messageElements}</ul>
      </div>
    );
  }
}

export default connect()(ChatBox)
