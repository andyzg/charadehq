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
      outcomeText = (
        <div>
          The real people have won!
        </div>
      );
    } else {
      outcomeText = (
        <div>
        The fakers won!
        </div>
      );
    }
    return (
      <div className="reveal">
        {outcomeText}
      </div>
    );
  }
}

export default Reveal

