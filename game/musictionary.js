// GAME STATES
const PREGAME = 'PREGAME'
const GUESSING = 'GUESSING'
const BREAK = 'BREAK'
const POST_GUESSING = 'POST_GUESSING'
const START_GAME = 'START_GAME'

function startGame(state) {
  return state;
}

module.exports = {
  onGameChange: function(state) {
    switch (state.event) {
      case 'START_GAME':
        console.log('Start game');
        return startGame(state);
      default:
        return statae;
    }
    return state;
  }
}
