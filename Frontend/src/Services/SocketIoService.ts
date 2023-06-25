import { Socket, io } from "socket.io-client";
import { authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";
import { messengerStore } from "../Redux/MessengerState";

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

  public getNewMessage(callback: (data: any) => void): void {   
    this.socket.on('newMessage', (data: any) => {     
      if (data.roomName === messengerStore.getState().activeRoom) {
        callback(data);
      }
    });
  }

  public getNewUnreadMessage(callback: (message: any) => void): void {
    this.socket.on("newUnreadMessage", callback);
  }  

  public clearUnreadMessages(userId: string, senderId: string): void {
    this.socket.emit("clearUnreadMessages", {userId, senderId});
  }

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