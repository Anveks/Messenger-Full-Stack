import http from 'http';
import socketIo from 'socket.io';
import { MessageModel } from '../2-models/message-model';
import dataService from './data-service';

function init(httpServer: http.Server): void {
  const options = { cors: {origin: '*'} };
  const socketServer = new socketIo.Server(httpServer, options);

  // 1. listen to client connections:
  socketServer.sockets.on('connection', (socket: socketIo.Socket) => {
    console.log(`Client ${socket.id} has connected!`);

  // handle joinRoom event
  socket.on('joinRoom', (roomName: string) => {
    socket.join(roomName);
    console.log(`Client ${socket.id} has joined room ${roomName}`);
  });

  socket.on('sendMessage', async ({roomName, message}) => {
    socket.to(roomName).emit('newMessage', message);
    // console.log(message);
    try {
      console.log(message);
      
      const newMessage = new MessageModel(message);
      console.log(newMessage);
      
      await dataService.saveMessage(newMessage);
    } catch(err: any){
        console.log(err.message);
    } 

    // add newMessage listener on client side
    // add sending message to the database
  })
    
    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} has disconnected.`);
    })
  })
}

export default {
  init
};