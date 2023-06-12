import http from 'http';
import { options } from 'joi';
import socketIo from 'socket.io';

function init(httpServer: http.Server): void {
  const options = { cors: {origin: '*'} };
  const socketServer = new socketIo.Server(httpServer, options);

  // 1. listen to client connections:
  socketServer.sockets.on('connection', (socket: socketIo.Socket) => {
    console.log('Client has been connected!');
    
    // 3. msg from client is our custom event:
    socket.on('msg-from-client', (msg: string) => {
      console.log('client has sent a new message: ' + msg);
    });

    const timerId = setInterval(() => {
      socket.emit('msg-from-server', 'here is a random number: ' + Math.random());
    }, 3000);
    
    socket.on('disconnect', () => { // should always be disconnect 
      console.log('client has been disconnected');
      clearInterval(timerId);
    })
  })
}

export default {
  init
};