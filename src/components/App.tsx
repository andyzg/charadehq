import React from 'react'
import ChatBoxContainer from '../containers/ChatBoxContainer'
import ParticipantListContainer from '../containers/ParticipantListContainer'
import NameInput from './NameInput'

const App = () => (
  <div id="container" className="pure-g">
    <NameInput />
    <ParticipantListContainer />
    <ChatBoxContainer />
  </div>
)

export default App
