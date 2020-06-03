import React from 'react'

class Answer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.dispatch(setName(this.state.value));
  }

  render() {
    return (
      <div className="answer">
        Answer component
      </div>
    );
  }
}

export default Answer
