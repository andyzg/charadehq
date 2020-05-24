import React from 'react'
import ChatBox from './ChatBox'
import ContentContainer from '../containers/ContentContainer'
import NameInput from './NameInput'

const App = () => (
  <div id="container" className="pure-g">
    <ChatBox />
    <NameInput />
  </div>
)

export default App
