import { SUBMIT_ANSWER, REFRESH_PARTICIPANTS, SET_ALL_STATUS } from '../actions/index'
import { SET_VOTE } from '../actions/faker'
import { Participant } from '../models/Participant'
import profile from '../util/profile'


const participants = (state: any[] = [], action) => {
  let newState = {}
  switch (action.type) {
    case REFRESH_PARTICIPANTS:
      return action.participants;
    case SET_ALL_STATUS:
      for (let i in state) {
        if (!action.data[i]) {
          console.log('Missing UUID in participants in its reducer', i);
          newState[state[i].uuid] = {
            ...state[i]
          };
        } else {
          newState[state[i].uuid] = {
            ...state[i],
            status: action.data[i]
          };
        }
      }
      return newState
    case SUBMIT_ANSWER:
      newState = {
        ...state,
        [profile.getUUID()]: {
          ...state[profile.getUUID()],
          status: action.answer
        }
      }
      return newState
    default:
      return state
  }
}

export default participants
