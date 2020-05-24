import React from 'react'
import ChatBoxContainer from '../containers/ChatBoxContainer'
import ParticipantListContainer from '../containers/ParticipantListContainer'
import NameInput from './NameInput'
import ShareLink from './ShareLink'

const App = () => (
  <div id="container" className="pure-g">
    <NameInput />
    <ParticipantListContainer />
    <ChatBoxContainer />
    <ShareLink />
  </div>
)

export default App
