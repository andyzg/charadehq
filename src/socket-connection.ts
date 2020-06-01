import store from './store'
import { onMessage, refreshParticipants } from './actions/index'
import { setState } from './actions/faker'
import profile from './util/profile'

let socket = io('localhost:3000/')

socket.on('connect', () => {

  profile.setUUID();
  socket.on('get-participants', (data) => {
    console.log('get part: ', data);
  });

  socket.on('refresh-participants', (data) => {
    console.log('get part: ', data);
    store.dispatch(refreshParticipants(data))
  });

  socket.on('get-profile', (cb) => {
    console.log('get my profile!');
    cb({
      name: profile.getName(),
      uuid: profile.getUUID(),
    });
  });

  socket.on('message', (data) => {
    console.log('Message received', data, socket.id);
    store.dispatch(onMessage(data));
  });

  socket.on('game-change', (data) => {
    store.dispatch(setState({
      event: data.event,
      state: data.event,
      gameState: data.gameState
    }));
  });

  socket.on('disconnect', function () {
    socket.emit('dc', profile.getUUID());
  });
});

export default socket
