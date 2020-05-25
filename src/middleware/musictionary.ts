import socket from '../socket-connection'
import { START_GAME } from '../actions/musictionary'


export default store => next => action => {
  try {
    if (action.type === START_GAME) {
      socket.emit('game-change', Object.assign({
        event: action.type
      }, store.getState().musictionary));
    }
    console.log('message', action);
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}
