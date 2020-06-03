import { MESSAGE, SET_USER_PENDING } from '../actions/index'
import { Message } from '../models/Message'


const messages = (state: Message[] = [], action) => {
  switch (action.type) {
    case MESSAGE:
      return [
        ...state,
        action.message
      ]
    case SET_USER_PENDING:
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}

export default messages
