export const START_GAME = 'START_GAME'
export const SET_STATE = 'SET_STATE'
export const SELECT_SONG = 'SELECT_SONG'


export const startGame = () => ({
  type: START_GAME,
})

export const selectSong = () => ({
  type: SELECT_SONG,
})

export const setState = (nextState) => ({
  type: SET_STATE,
  state: nextState
})
