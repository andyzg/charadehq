import { MESSAGE, SET_USER_STATUS } from '../actions/index'
import { Message } from '../models/Message'


// message: string
// uuid: string
// name: string
// datetime: date
const messages = (state: Message[] = [], action) => {
  switch (action.type) {
    case MESSAGE:
      return [
        ...state,
        action.message
      ]
    case SET_USER_STATUS:
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}

export default messages
