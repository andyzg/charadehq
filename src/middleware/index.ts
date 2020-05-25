import { applyMiddleware } from 'redux'
import profile from './profile'
import messages from './messages'
import musictionary from './musictionary'


export default applyMiddleware(profile, messages, musictionary)
