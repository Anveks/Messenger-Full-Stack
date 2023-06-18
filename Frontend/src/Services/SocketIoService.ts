import { Socket, io } from "socket.io-client";
import MessageModel from "../Models/MessageModel";
import appConfig from "../Utils/AppConfig";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";
import { authStore } from "../Redux/AuthState";

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

  // public getNewUnreadMessage(callback: (message: any) => void): void {
  //   this.socket.on("newUnreadMessage", callback);
  // }

  public updateOnlineStatus(isOnline: boolean): void {
    const userId = authStore.getState().user._doc._id;
    console.log(userId, isOnline);
    this.socket.emit("updateStatus", { userId, isOnline });
  }

  public getUdpatedStatus(callback: (data: any) => void): void {
    this.socket.on('statusUpdated', callback);
  }

};

const socketIoService = new SocketIoService();
export default socketIoService;