var client = require('../redis-client').getClient();
let fakerdb = require('../faker-db')(client);
let db = require('../db')(client);
let io = require('../socket-connection');
// ACTIONS
const ACTION_START_GAME = 'ACTION_FAKER_START_GAME'

// GAME STATES
const START_GAME = 'STATE_START_GAME'
const PENDING = 'STATE_PENDING'
const QUESTION = 'STATE_QUESTION'
const ANSWER = 'STATE_ANSWER'
const DISCUSS = 'STATE_DISCUSS'
const VOTE = 'STATE_VOTE'
const REVEAL = 'STATE_REVEAL'
const END = 'STATE_END'

function startGame(data) {
  let nextState = PENDING;
  fakerdb.addFakers(data.room, 1, (err, fakers) => {
    console.log(fakers);
    for (let f of fakers) {
      db.getSocketIds(f, (err, socketIds) => {
        console.log('Emitting faker role', socketIds);
        for (let i of socketIds) {
          io.getIo().to(i).emit('user-change', {
            userState: 'ROLE_FAKER'
          });
        }
      });
    }

    db.getRoomUUIDs(data.room, (err, uuids) => {
      for (let i of uuids) {
        if (fakers.includes(i)) {
          console.log('Skipping ', i);
          continue;
        }

        db.getSocketIds(i, (err, socketIds) => {
          for (let i of socketIds) {
            io.getIo().to(i).emit('user-change', {
              userState: 'ROLE_REAL'
            });
          }
        });
      }
    });
  });


  return {
    event: data.event,
    state: {}, // TODO
    gameState: QUESTION
  }
}

module.exports = {
  onGameChange: function(state) {
    switch (state.event) {
      case ACTION_START_GAME:
        console.log('Start game');
        return startGame(state);
      default:
        return state;
    }
    return state;
  }
}
