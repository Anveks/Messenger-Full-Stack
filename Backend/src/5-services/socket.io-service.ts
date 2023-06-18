import http from 'http';
import socketIo from 'socket.io';
import { MessageModel } from '../2-models/message-model';
import dataService from './data-service';
import { IUnreadMessage } from '../2-models/unread-message-model';
import mongoose from 'mongoose';

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
    try {
      const newMessage = new MessageModel(message); // creating messageModel
      await dataService.saveMessage(newMessage); // sending it to the server

      const { sender, recipient, content, timestamp } = newMessage; // destructure the newMessage obj    

      const unreadMessage: IUnreadMessage = {
        sender,
        messageBody: content,
        timestamp,
      };

      await dataService.addUnreadMessage(recipient, unreadMessage);
      socketServer.to(roomName).emit('newMessage', newMessage);
    } catch(err: any){
        console.log(err.message);
    } 
  });

  socket.on("updateStatus", (data) => { // getting updated data on login-logout
    socketServer.emit('statusUpdated', data); // emitting the data back to all clients
    dataService.updateUserOnlineStatus(data.userId, data.isOnline);
  });
    
    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} has disconnected.`);
    })
  })
}

export default {
  init
};