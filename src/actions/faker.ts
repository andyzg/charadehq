export const START_GAME = 'ACTION_FAKER_START_GAME'
export const SET_STATE = 'FAKER_SET_STATE'
export const SET_USER_STATE = 'FAKER_SET_USER_STATE'
export const DISMISS_ROLE_INFO = 'DISMISS_ROLE_INFO'


export const startGame = () => ({
  type: START_GAME,
})

export const setUserState = (state) => ({
  type: SET_USER_STATE,
  state
})

export const dismissRoleInfo = () => ({
  type: DISMISS_ROLE_INFO
})

export const setState = ({event, state, gameState}) => ({
  type: SET_STATE,
  event,
  state,
  gameState
})

