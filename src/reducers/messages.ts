import { MESSAGE } from '../actions/index'
import { Message } from '../models/Message'


const messages = (state: Message[] = [], action) => {
  switch (action.type) {
    case MESSAGE:
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}

export default messages
