import React from 'react'
import Footer from './Footer'
import ContentContainer from '../containers/ContentContainer'
import Nav from './Nav'

const App = () => (
  <div id="container" className="pure-g">
    <Nav />
    <ContentContainer />
  </div>
)

export default App
