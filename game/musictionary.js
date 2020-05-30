// GAME STATES
const PREGAME = 'PREGAME'
const GUESSING = 'GUESSING'
const BREAK = 'BREAK'
const POST_GUESSING = 'POST_GUESSING'
const START_GAME = 'START_GAME'
const SELECT_SONG = 'SELECT_SONG'

function startGame(state) {
  let nextState = PREGAME;
  return Object.assign(state, {
    state: nextState
  });
}

function selectSong(state) {
  let nextState = GUESSING;
  return Object.assign(state, {
    state: nextState
  });
}

module.exports = {
  onGameChange: function(state) {
    switch (state.event) {
      case START_GAME:
        console.log('Start game');
        return startGame(state);
      case SELECT_SONG:
        console.log('Select song');
        return selectSong(state);
      default:
        return statae;
    }
    return state;
  }
}
