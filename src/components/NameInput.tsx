import React from 'react'
import profile from '../util/profile'
import { connect } from 'react-redux'
import { setName } from '../actions/index'
import './NameInput.css';

class NameInput extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: profile.getName() };

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
    return (
      <div className="nameinput">
        <span className="nameinput__text">Welcome to Charade HQ!</span>
        <div className="input-group mb-3 nameinput__row">
          <input type="text" className="nameinput__input form-control" value={this.state.value} onChange={this.handleChange} aria-label="Message" aria-describedby="Input for message" placeholder="What's your name?" />
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="btn nameinput__button" type="button">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(NameInput)
