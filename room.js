const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

const ACTIVE_ROOMS = 'active-rooms';

module.exports = function(client) {

  let ROOM_KEY = DEV_PREFIX + ACTIVE_ROOMS;

  function makeid(length) {
     var result           = '';
     var characters       = 'abcdefghijklmnopqrstuvwxyz';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  function getRooms(cb) {
    return client.smembers(ROOM_KEY, cb);
  }

  function clearRooms(cb) {
    clients.del(ROOM_KEY, cb);
  }

  // Assume that the roomId is valid
  function addRoom(roomId, cb) {
    client.sadd(ROOM_KEY, roomId, cb)
  }

  function generateRoom(roomId, cb) {
    let rooms = getRooms((err, reply) => {
      let id = roomId ? roomId : makeid(8);
      addRoom(id, cb);
    });
  }

  return {
    getRooms,
    generateRoom
  }
}
