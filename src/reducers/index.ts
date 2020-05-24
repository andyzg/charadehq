import { combineReducers } from 'redux'
import participants from './participants'
import content from './content'
import nav from './nav'

export default combineReducers({
  participants,
  content,
  nav
})
