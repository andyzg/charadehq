var client = require('../redis-client').getClient();
let fakerdb = require('../faker-db')(client);
let db = require('../db')(client);
let io = require('../socket-connection');
let gameUtil = require('../game-util');
// ACTIONS
const ACTION_START_GAME = 'ACTION_FAKER_START_GAME'
const ACTION_SUBMIT_PROMPT = 'ACTION_SUBMIT_PROMPT'

// Events
const WRITE_ANSWER = 'EVENT_WRITE_ANSWER'
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

function createRoles(room, num, cb) {
  fakerdb.flushFakers(room, (err, resp) => {
    fakerdb.addFakers(room, num, (err, fakers) => {
      cb();
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
  });
}

function sendQuestions(data) {
  let room = data.room
  let realPayload =  {
    ...data,
    event: WRITE_ANSWER,
    gameState: ANSWER,
    round: 1,
    payload: {
      message: 'How many times did you shit today?',
      datetime: new Date(),
      messageUUID: gameUtil.createUUID(),
      type: 'GAME_STATUS'
    }
  }
  let fakePayload = {
    ...realPayload,
    payload: {
      ...realPayload.payload,
      message: 'Put a number between 1 to 10'
    }
  }

  fakerdb.getFakers(room, (err, fakers) => {
    console.log('Fakers: ', fakers);
    db.getRoomUUIDs(room, (err, uuids) => {
      for (let i of uuids) {
        if (fakers.includes(i)) {
          // Don't send them the question
          db.getSocketIds(i, (err, socketIds) => {
            for (let s of socketIds) {
              io.getIo().to(s).emit('game-change', fakePayload);
            }
          });

        } else {
          // Send them the question
          db.getSocketIds(i, (err, socketIds) => {
            for (let s of socketIds) {
              io.getIo().to(s).emit('game-change', realPayload);
            }
          });
        }
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
  createRoles(data.room, 1, () => {
    sendQuestions(data);
  });
  fakerdb.flushAnswers(data.room);
  fakerdb.flushVotes(data.room);
  fakerdb.setRound(data.room, 1);

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

            if (Object.keys(voteCounter).length === 0) {
              console.log('ERROR!!!! NO ONE VOTED');
              return;
            }

            // Get the key with most votes
            // TODO: Fix when there are no votes
            // TODO: This assumes that there's only one faker
            let target = Object.keys(voteCounter).reduce((a, b) => voteCounter[a] > voteCounter[b] ? a : b);
            let win = fakers.includes(target);

            fakerdb.getRound(data.room, (err, round) => {
              // TODO: If past 3 rounds, end the game
              fakerdb.setRound(data.room, round + 1);

              // Reveals what are the votes and whether game has ended
              io.getIo().to(data.room).emit('game-change', {
                ...data,
                event: SHOW_VOTE,
                gameState: REVEAL_VOTES,
                payload: {
                  votes,
                  win,
                }
              });

              // Proceed to the next round
              setTimeout(() => {
                // Votes are ephemeral, remove once done with
                fakerdb.flushVotes(data.room);
                fakerdb.flushAnswers(data.room);
                io.getIo().to(data.room).emit('game-change', {
                  ...data,
                  event: WRITE_ANSWER,
                  gameState: ANSWER,
                  payload: {
                    votes,
                    win
                  }
                });
                gameUtil.refreshParticipants(data.room);
              }, 10000);
            });
          });
        });
      });
    });
  });

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
      default:
        return state;
    }
    return state;
  }
}
