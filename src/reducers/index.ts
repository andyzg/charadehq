import { combineReducers } from 'redux'
import participants from './participants'
import messages from './messages'
import musictionary from './musictionary'

export default combineReducers({
  participants,
  messages,
  musictionary
})
