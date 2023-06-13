import http from 'http';
import socketIo from 'socket.io';

function init(httpServer: http.Server): void {
  const options = { cors: {origin: '*'} };
  const socketServer = new socketIo.Server(httpServer, options);

  // 1. listen to client connections:
  socketServer.sockets.on('connection', (socket: socketIo.Socket) => {
    console.log(`Client ${socket.id} has connected!`);
    
    
    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} has disconnected.`);
    })
  })
}

export default {
  init
};