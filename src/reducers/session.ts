import { INIT } from '../actions/index'
import { SHOW_ROLE_INFO, DISMISS_ROLE_INFO } from '../actions/index'


const session = (state: {} = {}, action) => {
  console.log('Session reducer', action.type);
  switch (action.type) {
    case INIT:
      return {
        ...state,
        room: (window as any).ROOM
      }
    case SHOW_ROLE_INFO:
      return {
        ...state,
        roleModal: true
      }
    case DISMISS_ROLE_INFO:
      return {
        ...state,
        roleModal: false
      }
    default:
      return state
  }
}

export default session
