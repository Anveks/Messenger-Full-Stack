import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { UsersActionType, usersStore } from "../Redux/UsersState";


class MessengerService {

  public async getAllUsers(): Promise<UserModel[]>{

    let users = usersStore.getState().users;
    if (users.length === 0 ) {
      const result = await axios.get<UserModel[]>(appConfig.usersUrl);
      users = result.data;
      usersStore.dispatch({type: UsersActionType.fetchUsers, payload: users});
    }
    return users;
  }

}

const messengerService = new MessengerService();

export default messengerService;