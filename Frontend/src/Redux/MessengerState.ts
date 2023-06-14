import { createStore } from "redux";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

export class MessengerState {

// messenger state
}

export enum MessengerActionType {
// action types
}

export interface MessengerAction {
    type: MessengerActionType;
    payload?: any;
}

export function messengerReducer(currentState = new MessengerState(), action: MessengerAction): MessengerState {

    const newState = { ...currentState };

    switch (action.type) {
// actions here
    }

    return newState;
}

export const messengerStore = createStore(messengerReducer);