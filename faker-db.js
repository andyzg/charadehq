const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

let client = require('./redis-client').getClient();
let db = require('./db')(client);
const ROOM_TO_FAKERS_PREFIX = 'room-to-fakers';
const UUID_TO_ANSWER_PREFIX = 'uuid-to-answer';

module.exports = function(client) {

  // Socket UUID to client UUID
  let ROOM_TO_FAKERS_PREFIX_KEY = DEV_PREFIX + ROOM_TO_FAKERS_PREFIX;

  // UUID to answer, prefixed with room id
  let UUID_TO_ANSWER_PREFIX_KEY = DEV_PREFIX + UUID_TO_ANSWER_PREFIX;

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

  return {
    addFakers,
    addAnswer,
    getAnswers,
    flushAnswers
  }
}
