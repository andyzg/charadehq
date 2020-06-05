import React from 'react'
import './Reveal.css';

class Reveal extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="reveal">

      </div>
    );
  }
}

export default Reveal

