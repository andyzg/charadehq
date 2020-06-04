import { REFRESH_PARTICIPANTS, SET_ALL_STATUS } from '../actions/index'
import { Participant } from '../models/Participant'


const participants = (state: any[] = [], action) => {
  let newState = {}
  switch (action.type) {
    case REFRESH_PARTICIPANTS:
      for (let i in action.participants) {
        if (!state[i]) {
          continue;
        }
        newState[i] = {
          ...state[i],
          ...action.participants[i]
        }
      }
      return action.participants;
    case SET_ALL_STATUS:
      for (let i in state) {
        if (!action.data[i]) {
          console.log('Missing UUID in participants in its reducer', i);
        }
        newState[state[i].uuid] = {
          name: state[i].name,
          uuid: state[i].uuid,
          status: action.data[i]
        };
      }
      return newState
    default:
      return state
  }
}

export default participants
