import { REFRESH_PARTICIPANTS } from '../actions/index'
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
