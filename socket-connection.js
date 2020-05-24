var io = null;

module.exports = {
  setIo: function(http) {
    console.log('setting up io');
    io = require('socket.io')(http);
  },
  getIo: () => { return io },
  closeIo: () => { io.close() }
}
