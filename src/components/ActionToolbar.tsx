import React from 'react'
import { connect } from 'react-redux'
import { switchIndices } from '../actions'

const ActionToolbar = ({ dispatch }) => {


  let f = () => {
    dispatch(switchIndices())
  }

  return (
    <div className="action-toolbar">
      <div onClick={f} className="action-item action-shuffle"><span className="action-text">Shuffle</span> <img src="./static/img/shuffle.svg" /></div>

    </div>
  )
}

export default connect()(ActionToolbar)
