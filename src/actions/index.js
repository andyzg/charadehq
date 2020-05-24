export const SET_NAME = 'SET_NAME'
export const REFRESH_PARTICIPANTS = 'REFRESH_PARTICIPANTS'


export const clickWarmup = () => ({
  type: 'WARMUP',
})

export const clickWorkout = () => ({
  type: 'WORKOUT',
})

export const clickEnding = () => ({
  type: 'ENDING',
})

export const switchStage = stage => ({
  type: 'SWITCH_STAGE',
  stage
})

export const switchPacks = stage => ({
  type: 'SWITCH_PACKS',
  stage
})

export const switchIndices = () => ({
  type: 'SWITCH_INDICES',
})

export const setName = (name) => ({
  type: SET_NAME,
  name
})

export const refreshParticipants= (name) => ({
  type: REFRESH_PARTICIPANTS,
  name
})
