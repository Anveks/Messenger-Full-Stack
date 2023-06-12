import express, { Request, Response } from 'express';
import { Server, Socket } from "socket.io";
import http from 'http';
import path from 'path';

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);
app.use(express.static('../Frontend/build'));

app.get('*', (request: Request, response: Response) => {
  response.sendFile(path.resolve('..', 'Frontend', 'build', 'index.html'));
});

// Socket.io event handling
io.on('connection', (socket: Socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.emit('server-message', 'this is a message from server');


  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

expressServer.listen((5000), () => {
  console.log('Server is running on port: http://localhost:5000/');
});
