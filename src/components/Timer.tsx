import React from 'react'

class Timer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.timer}
      </div>
    );
  }
}

export default Timer

