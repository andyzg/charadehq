const participants = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANTS':
      return action.participants;
    case 'REFRESH_PARTICIPANTS':
      return Object.assign(action.participant, state);
    default:
      return state
  }
}

export default participants
