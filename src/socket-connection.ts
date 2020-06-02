import store from './store'
import { onMessage, refreshParticipants, setTimer, showPrompt } from './actions/index'
import { setState, setUserState } from './actions/faker'
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

  socket.on('user-change', (data) => {
    store.dispatch(setUserState(data.userState));
  });

  socket.on('disconnect', function () {
    socket.emit('dc', profile.getUUID());
  });

  socket.on('timer', (secondsRemaining) => {
    store.dispatch(setTimer(secondsRemaining));
  });

  socket.on('faker-prompt-question', (data) => {
    console.log('Faker prompt');
    store.dispatch(showPrompt(data));
  });

});

export default socket
