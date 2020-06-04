import { REFRESH_PARTICIPANTS, SET_ALL_STATUS } from '../actions/index'
import { Participant } from '../models/Participant'


const participants = (state: any[] = [], action) => {
  switch (action.type) {
    case REFRESH_PARTICIPANTS:
      return action.participants;
    case SET_ALL_STATUS:
      let newState = []
      for (let i = 0; i < state.length; i++) {
        newState.push({
          name: state[i].name,
          uuid: state[i].uuid,
          status: action.data[state[i].uuid]
        });
      }
      return newState
    default:
      return state
  }
}

export default participants
