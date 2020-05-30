import { INIT } from '../actions/index'
import { SET_STATE } from '../actions/musictionary'
import { MusictionaryState, PENDING } from '../models/MusictionaryState'


const musictionary = (state: MusictionaryState = {}, action) => {
  switch (action.type) {
    case INIT:
      return {
        state: PENDING
      };
    case SET_STATE:
      return action.state
    default:
      return state;
  }
}

export default musictionary
