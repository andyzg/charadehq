import { INIT } from '../actions/index'
import { SET_USER_STATE, SET_STATE, SET_VOTE } from '../actions/faker'
import { PENDING, ALIVE, WAITING, SHOW_ROLE, FakerState } from '../models/FakerState'


const musictionary = (state: FakerState = ({} as FakerState), action) => {
  switch (action.type) {
    case INIT:
      return {
        gameState: PENDING,
        userState: WAITING
      };
    case SET_STATE:
      return {
        ...state,
        gameState: action.gameState,
        players: action.state
      }
    case SET_USER_STATE:
      return {
        ...state,
        userState: action.userState
      }
    case SET_VOTE:
      return {
        ...state,
        voted: action.uuid
      }
    default:
      return state;
  }
}

export default musictionary

