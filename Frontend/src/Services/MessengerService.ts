import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { UsersActionType, usersStore } from "../Redux/UsersState";
import MessageModel from "../Models/MessageModel";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";
import UnreadMessageModel from "../Models/UnreadMessageModel";


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
    const result = await axios.get<UnreadMessageModel[]>(appConfig.unreadMessagesUrl);
    const unreadMessages = result.data;
    messengerStore.dispatch({
      type: MessengerActionType.AddUnreadMessages,
      payload: unreadMessages
    });
    return unreadMessages;
  }

}

const messengerService = new MessengerService();

export default messengerService;