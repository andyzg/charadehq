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

    let outcomeText = null
    if (this.props.data.win) {
      if (this.props.isFaker) {
        // Is faker and lost
        outcomeText = (
          <div className="reveal__text">
            They figured you out!
          </div>
        );
      } else {
        // Real person and won
        outcomeText = (
          <div className="reveal__text">
          The real ones figured out the faker!
          </div>
        );
      }
    } else {
      if (this.props.isFaker) {
        // Faker won
        outcomeText = (
          <div className="reveal__text">
            You won! Your friends couldn't figure you out!
          </div>
        );
      } else {
        // Real person and lost
        outcomeText = (
          <div className="reveal__text">
            The faker got away!
          </div>
        );
      }
    }
    return (
      <div className="reveal">
        {outcomeText}
      </div>
    );
  }
}

export default Reveal

