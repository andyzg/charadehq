import socket from '../socket-connection'
import profile from './profile'


export default {
  sendGameChange: function(store, event, payload) {
    socket.emit('game-change', {
      ...store.getState().faker,
      room: store.getState().session.room,
      source: profile.getUUID(),
      name: profile.getName(),
      event,
      payload
    });
  }
}
