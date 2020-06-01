export const START_GAME = 'STATE_START_GAME'
export const PENDING = 'STATE_PENDING'
export const QUESTION = 'STATE_QUESTION'
export const ANSWER = 'STATE_ANSWER'
export const DISCUSS = 'STATE_DISCUSS'
export const VOTE = 'STATE_VOTE'
export const REVEAL = 'STATE_REVEAL'
export const END = 'STATE_END'

export const ROLE_OUT = 'ROLE_OUT'
export const ROLE_REAL = 'ROLE_REAL'
export const ROLE_FAKER = 'ROLE_FAKER'

// User states
export const WAITING = 'WAITING'
export const SHOW_ROLE = 'SHOW_ROLE'
export const ALIVE = 'ALIVE'
export const OUT = 'OUT'

export interface Player {
  role?: string
  clientUUID: string
  name: string
}

export interface FakerState {
  me: Player;
  gameState: string;
  // Updated from the backend
  players: { [key: string]: Player };
  // Updated from backend
  userState: string;
}
