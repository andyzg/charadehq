import store from './store'
import { onMessage, refreshParticipants, setTimer, showPrompt, setUserStatus } from './actions/index'
import { setState, setUserState, setVote } from './actions/faker'
import profile from './util/profile'

let socket = io('localhost:3000/')

socket.on('connect', () => {

  profile.setUUID();
  socket.on('get-participants', (data) => {
    console.log('get part: ', data);
  });

  socket.on('refresh-participants', (data) => {
    console.log('refresh participants', data);
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
    console.log('GAME CHANGE!', data);
    store.dispatch(setState(data));
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

  socket.on('faker-vote', ({source, target}) => {
    console.log('Faker vote???. Nothing is happening from this TODO');
  });
});

export default socket
