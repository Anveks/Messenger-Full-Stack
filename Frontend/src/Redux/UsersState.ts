import { createStore } from "redux";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

export class UsersState {
  public users: UserModel[] = [];
}

export enum UsersActionType {
  fetchUsers
}

export interface UsersAction {
    type: UsersActionType;
    payload?: any;
}

export function usersReducer(currentState = new UsersState(), action: UsersAction): UsersState {

  const newState = { ...currentState };

  switch (action.type) {
    case UsersActionType.fetchUsers:
        newState.users = action.payload;
      }

  return newState;
}

export const usersStore = createStore(usersReducer);