import { combineReducers } from 'redux'
import participants from './participants'
import messages from './messages'
import faker from './faker'
import musictionary from './musictionary'
import session from './session'

export default combineReducers({
  participants,
  messages,
  faker,
  musictionary,
  session
})
