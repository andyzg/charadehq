import { INIT, SET_PAYLOAD } from '../actions/index'
import { SET_USER_STATE, SET_STATE, SET_VOTE, SET_QUESTION } from '../actions/faker'
import { PENDING, ALIVE, WAITING, SHOW_ROLE, FakerState } from '../models/FakerState'


const faker = (state: FakerState = ({} as FakerState), action) => {
  switch (action.type) {
    case INIT:
      return {
        gameState: PENDING,
        userState: WAITING
      };
    case SET_QUESTION:
      return {
        ...state,
        question: action.question
      }
    case SET_PAYLOAD:
      return {
        ...state,
        payload: action.payload
      }
    case SET_STATE:
      return {
        ...state,
        gameState: action.data.gameState,
      }
    case SET_USER_STATE:
      return {
        ...state,
        userState: action.userState
      }
    default:
      return state;
  }
}

export default faker

