import { SET_STATE } from '../actions/musictionary'
const musictionary = (state = {}, action) => {
  switch (action.type) {
    case SET_STATE:
      return action.state
    default:
      return state
  }
}

export default musictionary
