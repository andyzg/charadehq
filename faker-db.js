const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

let client = require('./redis-client').getClient();
let db = require('./db')(client);
const ROOM_TO_FAKERS_PREFIX = 'room-to-fakers';

module.exports = function(client) {

  // Socket UUID to client UUID
  let ROOM_TO_FAKERS_PREFIX_KEY = DEV_PREFIX + ROOM_TO_FAKERS_PREFIX;

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

  return {
    addFakers
  }
}
