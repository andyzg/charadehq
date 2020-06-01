import socket from '../socket-connection'
import { START_GAME, SET_USER_STATE, SET_STATE, setUserState } from '../actions/faker'
import { showRoleInfo } from '../actions/index'
import { SHOW_ROLE } from '../models/FakerState'


export default store => next => action => {
  try {
    switch (action.type) {
      case START_GAME:
        socket.emit('game-change', {
          ...store.getState().faker,
          event: START_GAME,
          room: store.getState().session.room
        });
        break;
      case SET_STATE:
        console.log('Set state: ', action.state);
        switch (action.event) {
          case (START_GAME):
            store.dispatch(showRoleInfo())
            break;
        }
        break
      case SET_USER_STATE:
        console.log('SET USER STATE: ', action);
      default:
    }
    next(action)
  } catch (err) {
    console.error('Caught an error in musictionary middleware', err)
    throw err
  }
}

