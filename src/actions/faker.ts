export const START_GAME = 'ACTION_FAKER_START_GAME'
export const SET_STATE = 'FAKER_SET_STATE'
export const SET_USER_STATE = 'FAKER_SET_USER_STATE'
export const SET_VOTE = 'SET_VOTE'


export const startGame = () => ({
  type: START_GAME,
})

export const setUserState = (userState) => ({
  type: SET_USER_STATE,
  userState
})

export const setVote = (uuid) => ({
  type: SET_VOTE,
  uuid
})

export const setState = (data) => ({
  type: SET_STATE,
  data
})

