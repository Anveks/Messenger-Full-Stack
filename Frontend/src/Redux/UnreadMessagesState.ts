import { createStore } from "redux";
import UnreadMessageModel from "../Models/UnreadMessageModel";

export class UnreadMessagesState {
    public lastAction: string = "";
    public unreadMessages: UnreadMessageModel[] = [];
}

export enum UnreadMessagesActionType {
    AddUnreadMessages,
    UpdateUnreadMessages,
    Reset
}

export interface UnreadMessagesAction {
    type: UnreadMessagesActionType;
    payload?: any;
}

export function unreadMessagesReducer(currentState = new UnreadMessagesState(), action: UnreadMessagesAction): UnreadMessagesState {

    const newState = { ...currentState };

    switch (action.type) {
        case UnreadMessagesActionType.AddUnreadMessages:
            newState.unreadMessages = action.payload;
            break;
        case UnreadMessagesActionType.UpdateUnreadMessages:
            // newState.unreadMessages = [...newState.unreadMessages, action.payload];
            newState.unreadMessages.push(action.payload);
            break;
        case UnreadMessagesActionType.Reset:
            newState.unreadMessages = [];
            break;
    };

    // following the steps of a great sensei i once knew i added the last action for Redux:
    newState.lastAction = UnreadMessagesActionType[action.type]; 

    return newState;
}

export const unreadMessagesStore = createStore(unreadMessagesReducer);