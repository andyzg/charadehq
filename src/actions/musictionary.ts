export const START_GAME = 'START_GAME'
export const SET_STATE = 'SET_STATE'


export const startGame = () => ({
  type: START_GAME,
})

export const setState = (nextState) => ({
  type: SET_STATE,
  state: nextState
})
