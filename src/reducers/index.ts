import { combineReducers } from 'redux'
import participants from './participants'
import messages from './messages'
import nav from './nav'

export default combineReducers({
  participants,
  messages,
  nav
})
