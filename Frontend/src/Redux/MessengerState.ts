import { createStore } from "redux";
import MessageModel from "../Models/MessageModel";
import UnreadMessageModel from "../Models/UnreadMessageModel";

export class MessengerState {
    public messages: MessageModel[] = [];
    public currentRecipientId: string;
    public unreadMessages: UnreadMessageModel[] = [];
}

export enum MessengerActionType {
    FetchMessages,
    UpdateMessages,
    AddNewMessage,
    UpdateRecipientId,
    AddUnreadMessages,
    UpdateUnreadMessages
}

export interface MessengerAction {
    type: MessengerActionType;
    payload?: any;
}

export function messengerReducer(currentState = new MessengerState(), action: MessengerAction): MessengerState {

    const newState = { ...currentState };

    switch (action.type) {
        case MessengerActionType.FetchMessages:
            newState.messages = action.payload;
            break;
        case MessengerActionType.UpdateRecipientId:
            newState.currentRecipientId = action.payload;
            break;
        case MessengerActionType.UpdateMessages:
            newState.messages = [...newState.messages, action.payload];
            break;  
        case MessengerActionType.AddUnreadMessages:
            newState.unreadMessages = action.payload;
            break;
        case MessengerActionType.UpdateUnreadMessages:
            //  
    }

    return newState;
}

export const messengerStore = createStore(messengerReducer);