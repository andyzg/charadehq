import React from 'react'
import profile from '../util/profile'
import { connect } from 'react-redux'
import './ChatBox.css';

class ChatBox extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') {
      return
    }
    console.log('Emitting message');
    this.props.sendMessage(this.state.value);
    this.setState({ value: '' })
  }

  render() {
    let messageElements = []
    for (let i = 0; i < this.props.messages.length; i++) {
      let classNames = ''
      if (this.props.messages[i].type === 'STATUS') {
        classNames = 'chatbox__status-message'
      }

      messageElements.push(
        <div className={'chatbox__message ' + classNames} key={i}>
          <span className="chatbox__sender">{this.props.messages[i].name + ':'}</span>
          {this.props.messages[i].message}
        </div>
      )
    }

    return (
      <div className="chatbox">
        <br /> <br />
        Chat box:
        <div className="chatbox__message-list">{messageElements}</div>

        <div className="chatbox__input input-group mb-3">
          <input type="text" placeholder="Enter your message" className="form-control" value={this.state.value} onChange={this.handleChange} aria-label="Message" aria-describedby="Input for message" />
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="button-primary btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>

      </div>
    );
  }
}

export default ChatBox
