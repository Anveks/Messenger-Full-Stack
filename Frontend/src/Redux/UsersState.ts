import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class UsersState {
  public users: UserModel[] = [];
  public activeUser = "";
}

export enum UsersActionType {
  FetchUsers,
  SetActiveUser
}

export interface UsersAction {
    type: UsersActionType;
    payload?: any;
}

export function usersReducer(currentState = new UsersState(), action: UsersAction): UsersState {

  const newState = { ...currentState };

  switch (action.type) {
    case UsersActionType.FetchUsers:
      newState.users = action.payload;
      break;
    case UsersActionType.SetActiveUser:
      newState.activeUser = action.payload;
      break;    
  }

  return newState;
}

export const usersStore = createStore(usersReducer);