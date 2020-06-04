import { SUBMIT_ANSWER, REFRESH_PARTICIPANTS, SET_ALL_STATUS } from '../actions/index'
import { SET_VOTE } from '../actions/faker'
import { Participant } from '../models/Participant'
import profile from '../util/profile'


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
      console.log(action);
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
    case SET_VOTE:
      let votes = []
      if (state[action.uuid].votes) {
        votes = state[action.uuid].votes
      }

      newState = {
        ...state,
        [action.uuid]: {
          ...state[action.uuid],
          votes: [
            ...votes,
            action.uuid
          ]
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
