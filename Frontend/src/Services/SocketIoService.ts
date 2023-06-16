import { Socket, io } from "socket.io-client";
import MessageModel from "../Models/MessageModel";
import appConfig from "../Utils/AppConfig";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";

class SocketIoService {

  private socket: Socket = null;

  public init(): void {
    this.socket = io(appConfig.socketUrl); // starting socket.io event listener
  }

  public joinRoom(roomName: string): void {
    if (this.socket !== null){
      this.socket.emit('joinRoom', roomName); // creating/joining a room
    }
  }

  public sendMessage(roomName: string, message: string): void{
    this.socket.emit('sendMessage', { roomName, message }); // sending a message to a room
  }

  public getNewMessage(callback: (message: any) => void): void {
    this.socket.on('newMessage', callback);
  }

};

const socketIoService = new SocketIoService();
export default socketIoService;