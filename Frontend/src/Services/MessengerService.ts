import axios from "axios";
import MessageModel from "../Models/MessageModel";
import UnreadMessageModel from "../Models/UnreadMessageModel";
import UserModel from "../Models/UserModel";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";
import { UnreadMessagesActionType, unreadMessagesStore } from "../Redux/UnreadMessagesState";
import { UsersActionType, usersStore } from "../Redux/UsersState";
import appConfig from "../Utils/AppConfig";


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

}

const messengerService = new MessengerService();

export default messengerService;