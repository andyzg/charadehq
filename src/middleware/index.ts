import { applyMiddleware } from 'redux'
import profile from './profile'
import messages from './messages'


export default applyMiddleware(profile, messages)
