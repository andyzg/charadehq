module.exports = {
  createRoom: (io, roomName) => {
    console.log('Creating room called ', roomName);
    let connection = io.of(roomName);

    io.on('connect', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('hello', (data) => {
        console.log(data);
      });
    });
  }
}
