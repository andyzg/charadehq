import { applyMiddleware } from 'redux'
import profile from './profile'
import messages from './messages'
import faker from './faker'
import participants from './participants'
import musictionary from './musictionary'


export default applyMiddleware(profile, participants, messages, faker, musictionary)
