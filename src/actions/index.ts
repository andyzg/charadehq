export const INIT = 'INIT'
export const SET_NAME = 'SET_NAME'
export const REFRESH_PARTICIPANTS = 'REFRESH_PARTICIPANTS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const MESSAGE = 'MESSAGE'
export const SHOW_ROLE_INFO = 'SHOW_ROLE_INFO'
export const DISMISS_ROLE_INFO = 'DISMISS_ROLE_INFO'


export const init = () => ({
  type: INIT,
})

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
})

export const onMessage = (message) => ({
  type: MESSAGE,
  message
})

export const setName = (name) => ({
  type: SET_NAME,
  name
})

export const showRoleInfo = () => ({
  type: SHOW_ROLE_INFO
})

export const dismissRoleInfo = () => ({
  type: DISMISS_ROLE_INFO
})

export const refreshParticipants= (participants) => ({
  type: REFRESH_PARTICIPANTS,
  participants
})
