import React from 'react'
import ChatBoxContainer from '../containers/ChatBoxContainer'
import ParticipantListContainer from '../containers/ParticipantListContainer'
import Header from '../containers/HeaderContainer'
import GameViewContainer from '../containers/game/GameViewContainer'
import RevealContainer from '../containers/RevealContainer'
import './App.css';

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <RevealContainer />
            <Header />
            <ParticipantListContainer />
            <GameViewContainer />
          </div>
          <div className="col-md-4">
            <ChatBoxContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App
