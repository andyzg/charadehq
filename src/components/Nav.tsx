import { connect } from 'react-redux'
import { switchStage, switchPacks, switchIndices } from '../actions'
import React from 'react'

const Nav = ({dispatch}) => {

  let f = stuff => {
    dispatch(switchStage(stuff))
    dispatch(switchIndices())
    dispatch(switchPacks())
    return null
  }

  return (<div className="nav pure-u-1-5">
    <ul className="nav-list pure-menu-list">
      <li onClick={f.bind(null, 'WARMUP')} className="list-item"> Warm Up </li>
      <li onClick={f.bind(null, 'WORKOUT')} className="list-item"> Workout </li>
      <li onClick={f.bind(null, 'ENDING')} className="list-item"> Ending </li>
    </ul>
  </div>)
}

export default connect()(Nav)
