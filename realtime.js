module.exports = function(http) {
  var io = require('socket.io')(http);

  console.log('heyyyy');
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


}
