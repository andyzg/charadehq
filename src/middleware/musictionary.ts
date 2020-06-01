import socket from '../socket-connection'
import { START_GAME, SELECT_SONG } from '../actions/musictionary'


export default store => next => action => {
  try {
    switch (action.type) {
      case START_GAME:
        socket.emit('game-change', Object.assign({
          event: START_GAME
        }, store.getState().musictionary));
        break;
      case SELECT_SONG:
        socket.emit('game-change', Object.assign({
          event: SELECT_SONG
        }, store.getState().musictionary));
        break;
      default:
    }
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}
