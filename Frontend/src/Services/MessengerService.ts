import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { UsersActionType, usersStore } from "../Redux/UsersState";
import MessageModel from "../Models/MessageModel";
import { MessengerActionType, messengerStore } from "../Redux/MessengerState";


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
      payload: messageHistory});
    return messageHistory;
  }

}

const messengerService = new MessengerService();

export default messengerService;