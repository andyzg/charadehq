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

function createRoles(room, num) {
  fakerdb.addFakers(room, num, (err, fakers) => {
    for (let f of fakers) {
      db.getSocketIds(f, (err, socketIds) => {
        for (let i of socketIds) {
          io.getIo().to(i).emit('user-change', {
            userState: 'ROLE_FAKER'
          });
        }
      });
    }

    db.getRoomUUIDs(room, (err, uuids) => {
      for (let i of uuids) {
        if (fakers.includes(i)) {
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
}

function setupTimer(room, seconds, cb) {
  let secondsRemaining = seconds
  let interval = setInterval(() => {
    io.getIo().to(room).emit('timer', secondsRemaining);

    if (secondsRemaining <= 0) {
      clearInterval(interval);
    }
    secondsRemaining -= 1
  }, 1000);
}

function startGame(data) {
  let nextState = PENDING;

  createRoles(data.room, 1);
  setupTimer(data.room, 5, () => {
    // Send out the questions
    io.getIo().to(data.room).emit('game-change', {
    });
  });

  db.getRandomUUID(data.room, (err, uuid) => {
    db.getSocketIds(uuid, (err, resp) => {
      for (let i of resp) {
        io.getIo().to(i).emit('faker-prompt-question', {
          // TODO: Add examples
          message: 'Add question'
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
