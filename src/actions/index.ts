export const INIT = 'INIT'
export const SET_NAME = 'SET_NAME'
export const REFRESH_PARTICIPANTS = 'REFRESH_PARTICIPANTS'
export const MESSAGE = 'MESSAGE'


export const init = () => ({
  type: INIT,
})

export const onMessage = (message) => ({
  type: MESSAGE,
  message
})

export const setName = (name) => ({
  type: SET_NAME,
  name
})

export const refreshParticipants= (participants) => ({
  type: REFRESH_PARTICIPANTS,
  participants
})
