import React from 'react'
import ParticipantListContainer from '../../containers/ParticipantListContainer'
import { selectSong } from '../../actions/musictionary'
import { connect } from 'react-redux'

class GameView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('handleSubmit')
    this.props.dispatch(selectSong())
  }

  render() {
    if (this.props.game.state === 'PENDING') {
      return null;
    }

    console.log(this.props.game.state);
    // This should render the attempts, hints
    return (
      <div>
      {'Game state: ' + this.props.game.state}
        <button onClick={this.handleSubmit}>Game view</button>
      </div>
    );
  }
}

export default connect()(GameView)
