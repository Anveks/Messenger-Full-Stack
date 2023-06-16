import { Socket, io } from "socket.io-client";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";

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

};

const socketIoService = new SocketIoService();
export default socketIoService;