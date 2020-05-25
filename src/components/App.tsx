import React from 'react'
import ChatBoxContainer from '../containers/ChatBoxContainer'
import ParticipantListContainer from '../containers/ParticipantListContainer'
import NameInput from './NameInput'
import ShareLink from './ShareLink'
import StartButton from '../containers/StartButton'

const App = () => (
  <div id="container" className="pure-g">
    <NameInput />
    <ParticipantListContainer />
    <ChatBoxContainer />
    <ShareLink />
    <StartButton text="Start" />
  </div>
)

export default App
