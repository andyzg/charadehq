import React from 'react'
import ChatBoxContainer from '../containers/ChatBoxContainer'
import ParticipantListContainer from '../containers/ParticipantListContainer'
import NameInput from './NameInput'
import ShareLink from './ShareLink'
import StartButton from '../containers/StartButton'
import GameViewContainer from '../containers/game/GameViewContainer'
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
            <NameInput />
            <ShareLink />
            <StartButton text="Start" />
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
