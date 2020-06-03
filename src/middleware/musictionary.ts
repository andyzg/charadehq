import socket from '../socket-connection'
import { START_GAME, SELECT_SONG } from '../actions/musictionary'


export default store => next => action => {
  try {
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}
