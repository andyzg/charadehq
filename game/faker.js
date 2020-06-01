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

function startGame(state) {
  let nextState = PENDING;
  console.log(state);
  return {
    event: state.event,
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
