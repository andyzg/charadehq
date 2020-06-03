import { REFRESH_PARTICIPANTS, SET_USER_PENDING } from '../actions/index'
import { Participant } from '../models/Participant'


const participants = (state: { [key: string]: Participant } = {}, action) => {
  switch (action.type) {
    case REFRESH_PARTICIPANTS:
      return action.participants;
    default:
      return state
  }
}

export default participants
