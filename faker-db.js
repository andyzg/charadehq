const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

let client = require('./redis-client').getClient();
let db = require('./db')(client);
const ROOM_TO_FAKERS_PREFIX = 'room-to-fakers';
const UUID_TO_ANSWER_PREFIX = 'uuid-to-answer';
const UUID_TO_VOTE_PREFIX = 'uuid-to-vote';
const ROOM_TO_ROUND = 'room-to-round'

module.exports = function(client) {

  // Socket UUID to client UUID
  let ROOM_TO_FAKERS_PREFIX_KEY = DEV_PREFIX + ROOM_TO_FAKERS_PREFIX;

  // UUID to answer, prefixed with room id
  let UUID_TO_ANSWER_PREFIX_KEY = DEV_PREFIX + UUID_TO_ANSWER_PREFIX;

  // UUID to answer, prefixed with room id
  let UUID_TO_VOTE_PREFIX_KEY = DEV_PREFIX + UUID_TO_VOTE_PREFIX;

  // UUID to answer, prefixed with room id
  let ROOM_TO_ROUND_KEY = DEV_PREFIX + ROOM_TO_ROUND;

  function getRandom(array, n) {
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, n);
  }

  function addFakers(r, num, cb) {
    db.getRoomUUIDs(r, (err, uuids) => {
      let fakers = getRandom(uuids, num);
      console.log('Faker db:', fakers, uuids);
      client.sadd(ROOM_TO_FAKERS_PREFIX_KEY + r, ...fakers)
      cb(err, fakers);
    });
  }

  function getFakers(r, cb) {
    client.smembers(ROOM_TO_FAKERS_PREFIX_KEY + r, cb)
  }

  function flushFakers(r, cb) {
    client.del(ROOM_TO_FAKERS_PREFIX_KEY + r, cb)
  }

  function addAnswer(r, uuid, answer) {
    console.log('Adding answer: ', r, uuid, answer);
    client.hmset(UUID_TO_ANSWER_PREFIX_KEY + r, uuid, answer);
  }

  function getAnswers(r, cb) {
    client.hgetall(UUID_TO_ANSWER_PREFIX_KEY + r, cb);
  }

  function flushAnswers(r) {
    client.del(UUID_TO_ANSWER_PREFIX_KEY + r);
  }

  function addVote(r, uuid, target) {
    console.log('Adding vote: ', r, uuid, target);
    client.hmset(UUID_TO_VOTE_PREFIX_KEY + r, uuid, target);
  }

  function getVotes(r, cb) {
    client.hgetall(UUID_TO_VOTE_PREFIX_KEY + r, cb);
  }

  function flushVotes(r) {
    client.del(UUID_TO_VOTE_PREFIX_KEY + r);
  }

  function setRound(room, round, cb) {
    client.hmset(ROOM_TO_ROUND_KEY, room, round, cb);
  }

  function getRound(room, cb) {
    client.hget(ROOM_TO_ROUND_KEY, room, cb);
  }

  return {
    addFakers,
    getFakers,
    flushFakers,
    addAnswer,
    getAnswers,
    flushAnswers,
    addVote,
    getVotes,
    flushVotes,
    setRound,
    getRound
  }
}
