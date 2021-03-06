export const INIT = 'INIT'
export const SET_NAME = 'SET_NAME'
export const REFRESH_PARTICIPANTS = 'REFRESH_PARTICIPANTS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const MESSAGE = 'MESSAGE'
export const SHOW_ROLE_INFO = 'SHOW_ROLE_INFO'
export const DISMISS_ROLE_INFO = 'DISMISS_ROLE_INFO'
export const SET_TIMER = 'SET_TIMER'
export const SHOW_PROMPT = 'SHOW_PROMPT'
export const SET_USER_STATUS = 'SET_USER_STATUS'
export const SET_ALL_STATUS = 'SET_ALL_STATUS'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const SET_PAYLOAD = 'SET_PAYLOAD'

export const SUBMIT_PROMPT = 'ACTION_SUBMIT_PROMPT'


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

export const showPrompt = (data) => ({
  type: SHOW_PROMPT,
  data
})

export const submitPrompt = (question) => ({
  type: SUBMIT_PROMPT,
  question
})

export const setAllStatus = (data) => ({
  type: SET_ALL_STATUS,
  data
})

export const setUserStatus = (message) => ({
  type: SET_USER_STATUS,
  message
})

export const refreshParticipants= (participants) => ({
  type: REFRESH_PARTICIPANTS,
  participants
})

export const setTimer = (timer) => ({
  type: SET_TIMER,
  timer
})

export const setPayload = (payload) => ({
  type: SET_PAYLOAD,
  payload
})

export const submitAnswer = (answer) => ({
  type: SUBMIT_ANSWER,
  answer
})
