var client = require('../redis-client').getClient();
let fakerdb = require('../faker-db')(client);
let db = require('../db')(client);
let io = require('../socket-connection');
// ACTIONS
const ACTION_START_GAME = 'ACTION_FAKER_START_GAME'
const ACTION_SUBMIT_PROMPT = 'ACTION_SUBMIT_PROMPT'

// Events
const START_VOTE = 'EVENT_START_VOTE'
const SHOW_VOTE = 'EVENT_SHOW_VOTE'

// GAME STATES
const START_GAME = 'STATE_START_GAME'
const PENDING = 'STATE_PENDING'
const QUESTION = 'STATE_QUESTION'
const ANSWER = 'STATE_ANSWER'
const DISCUSS = 'STATE_DISCUSS'
const VOTE = 'STATE_VOTE'
const REVEAL_VOTES = 'STATE_REVEAL_VOTES'
const REVEAL_WINNERS = 'STATE_REVEAL_WINNERS'
const END = 'STATE_END'

function createRoles(room, num) {
  fakerdb.addFakers(room, num, (err, fakers) => {
    // Assign all of the faker roles to socket ids
    for (let f of fakers) {
      db.getSocketIds(f, (err, socketIds) => {
        for (let i of socketIds) {
          io.getIo().to(i).emit('user-change', {
            userState: 'ROLE_FAKER'
          });
        }
      });
    }

    // Assign all of the real roles to socket ids
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
      cb();
      clearInterval(interval);
    }
    secondsRemaining -= 1
  }, 1000);
}

function startGame(data) {
  createRoles(data.room, 1);

  // Prompt one person to submit a question
  db.getRandomUUID(data.room, (err, uuid) => {
    db.getName(uuid, (err, name) => {
      let message = {
        // TODO: Add examples
        source: uuid,
        name: name,
        datetime: new Date(),
        message: name + ' is writing a prompt',
        type: 'STATUS'
      };

      // Send to everyone
      db.getRoomUUIDs(data.room, (err, uuids) => {
        for (let i of uuids) {
          db.getSocketIds(i, (err, socketId) => {
            for (let i of socketId) {
              io.getIo().to(i).emit('faker-prompt-question', message);
            }
          });
        }
      });
    });
  });

  return {
    ...data,
    gameState: QUESTION
  }
}

function submitPrompt(data) {
  console.log('Submit prompt: ', data);

  setupTimer(data.room, 5, () => {
    fakerdb.getAnswers(data.room, (err, resp) => {
      console.log('Get answers callback: ', resp);
      // Send out the questions
      io.getIo().to(data.room).emit('game-change', {
        ...data,
        event: START_VOTE,
        gameState: VOTE,
        payload: resp
      });
      fakerdb.flushAnswers(data.room);

      // Get votes in another 5 seconds
      setupTimer(data.room, 5, () => {
        // 1. Figure out who voted for who
        // 2. Figure out who's the faker
        // 3. Send the results to clients
        fakerdb.getVotes(data.room, (err, votes) => {
          console.log('Votes: ', votes);

          fakerdb.getFakers(data.room, (err, fakers) => {
            // Sum up all of the votes
            let voteCounter = {}
            for (let i in votes) {
              if (!voteCounter[votes[i]]) { voteCounter[votes[i]] = 0; }
              voteCounter[votes[i]] += 1
            }

            // Get the key with most votes
            // TODO: This assumes that there's only one faker
            let target = Object.keys(voteCounter).reduce((a, b) => voteCounter[a] > voteCounter[b] ? a : b);
            console.log('Vote counter: ', voteCounter, target);
            console.log('Calculating winner: ', fakers, votes);
            let win = fakers.includes(target);

            io.getIo().to(data.room).emit('game-change', {
              ...data,
              event: SHOW_VOTE,
              gameState: REVEAL_VOTES,
              payload: {
                votes,
                win
              }
            });
          });

          // Votes are ephemeral, remove once done with
          fakerdb.flushVotes(data.room);
        });
      });
    });
  });

  return {
    ...data,
    gameState: ANSWER,
    payload: data.payload
  };
}

module.exports = {
  onGameChange: function(state) {
    // State:
    //   gameState: string
    //   userState: string
    //   voted: uuid
    //   source:
    //   players: state
    //   event: string
    //   room: string
    switch (state.event) {
      case ACTION_START_GAME:
        console.log('Start game');
        return startGame(state);
      case ACTION_SUBMIT_PROMPT:
        return submitPrompt(state);
      default:
        return state;
    }
    return state;
  }
}
