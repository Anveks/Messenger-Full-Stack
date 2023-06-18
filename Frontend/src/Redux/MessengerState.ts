import { createStore } from "redux";
import MessageModel from "../Models/MessageModel";

export class MessengerState {
    public messages: MessageModel[] = [];
    public currentRecipientId: string;
    public unreadMessges: MessageModel[] = [];
}

export enum MessengerActionType {
    FetchMessages,
    UpdateMessages,
    AddNewMessage,
    UpdateRecipientId,
    AddUnreadMessage,
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
        case MessengerActionType.AddUnreadMessage:
            newState.unreadMessges = [...newState.unreadMessges, action.payload];
            break;
        case MessengerActionType.UpdateUnreadMessages:
            //    
    }

    return newState;
}

export const messengerStore = createStore(messengerReducer);