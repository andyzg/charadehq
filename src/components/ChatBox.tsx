import React from 'react'
import { connect } from 'react-redux'

const ChatBox = ({ dispatch }) => {

  return (
    <div className="">
      <ul id='chat-box'></ul>
    </div>
  )
}

export default connect()(ChatBox)
