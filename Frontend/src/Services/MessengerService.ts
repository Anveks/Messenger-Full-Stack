import axios from "axios";
import MessageModel from "../Models/MessageModel";
import UnreadMessageModel from "../Models/UnreadMessageModel";
import UserModel from "../Models/UserModel";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";
import { UnreadMessagesActionType, unreadMessagesStore } from "../Redux/UnreadMessagesState";
import { UsersActionType, usersStore } from "../Redux/UsersState";
import appConfig from "../Utils/AppConfig";
import socketIoService from "./SocketIoService";
import { authStore } from "../Redux/AuthState";


class MessengerService {

  public async getAllUsers(): Promise<UserModel[]>{

    let users = usersStore.getState().users;
    if (users.length === 0 ) {
      const result = await axios.get<UserModel[]>(appConfig.usersUrl);
      users = result.data;
      usersStore.dispatch({
        type: UsersActionType.FetchUsers, 
        payload: users});
    }
    return users;
  }

  public async getMessageHistory(id: string): Promise<MessageModel[]>{
    const result = await axios.get<MessageModel[]>(appConfig.messageHistoryUrl + id);
    const messageHistory = result.data;
    messengerStore.dispatch({
      type: MessengerActionType.FetchMessages, 
      payload: messageHistory
    });
    return messageHistory;
  }

  // TODO: check if clearing the unread msgs is needed on logout
  public async getUnreadMessages(): Promise<UnreadMessageModel[]>{
    let unreadMessages = unreadMessagesStore.getState().unreadMessages;
    if (unreadMessages.length === 0){
      const result = await axios.get<UnreadMessageModel[]>(appConfig.unreadMessagesUrl);
      unreadMessages = result.data;
      unreadMessagesStore.dispatch({
        type: UnreadMessagesActionType.AddUnreadMessages,
        payload: unreadMessages
      });
    }
    return unreadMessages;
  }

  public async clearUnreadMessages(senderId: string): Promise<void> {  
    const unreadMessages = unreadMessagesStore.getState().unreadMessages;
    const matchingMessages = unreadMessages.filter((message) => message.sender === senderId);

    matchingMessages.forEach((match) => {
      const index = unreadMessages.indexOf(match); // finding the index of each match
      unreadMessages.splice(index, 1); // deleting it
    });

    // updating the unread messages again:
    unreadMessagesStore.dispatch({ 
      type: UnreadMessagesActionType.AddUnreadMessages, 
      payload: unreadMessages
    });

    // clearing the unread msgs on the backend:
    socketIoService.clearUnreadMessages(authStore.getState().user._doc._id, senderId);
  }

}

const messengerService = new MessengerService();

export default messengerService;