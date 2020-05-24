import { combineReducers } from 'redux'
import participants from './participants'
import messages from './messages'

export default combineReducers({
  participants,
  messages
})
