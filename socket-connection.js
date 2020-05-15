var io = null;

module.exports = {
  setIo: function(http) {
    console.log('setting up io');
    io = require('socket.io')(http);
    io.on('connection', (socket) => {
      console.log('connection!!!')
    });
  },
  getIo: () => { return io }
}
