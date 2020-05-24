import store from './store'
import { refreshParticipants } from './actions/index'
import profile from './util/profile'
import { onMessage } from './actions/index'

let socket = io('localhost:3000/')

console.log('Created a socket!!!');
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
});

export default socket
