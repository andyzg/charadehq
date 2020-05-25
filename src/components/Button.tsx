import React from 'react'

class Button extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Emitting message');
    this.props.onSubmit();
  }

  render() {
    return (
      <div className="">
        <button onClick={this.handleSubmit}>{this.props.text}</button>
      </div>
    );
  }
}

export default Button

