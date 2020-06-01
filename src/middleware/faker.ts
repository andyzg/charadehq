import socket from '../socket-connection'
import { START_GAME, SET_STATE, setUserState } from '../actions/faker'
import { SHOW_ROLE } from '../models/FakerState'


export default store => next => action => {
  try {
    switch (action.type) {
      case START_GAME:
        socket.emit('game-change', {
          ...store.getState().faker,
          event: START_GAME
        });
        break;
      case SET_STATE:
        console.log('Set state: ', action.state);
        switch (action.event) {
          case (START_GAME):
            store.dispatch(setUserState(SHOW_ROLE))
            break;
        }
        break
      default:
    }
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}

