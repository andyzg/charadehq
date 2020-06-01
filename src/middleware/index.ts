import { applyMiddleware } from 'redux'
import profile from './profile'
import messages from './messages'
import faker from './faker'
import musictionary from './musictionary'


export default applyMiddleware(profile, messages, faker, musictionary)
