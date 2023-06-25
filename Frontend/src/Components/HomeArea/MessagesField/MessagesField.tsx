import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import MessageModel from "../../../Models/MessageModel";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import socketIoService from "../../../Services/SocketIoService";
import Message from "../Message/Message";
import "./MessagesField.css";
import { unreadMessagesStore, UnreadMessagesActionType } from "../../../Redux/UnreadMessagesState";

function MessagesField(props: any): JSX.Element {

    const [messages, setMessages] = useState<MessageModel[]>(messengerStore.getState().messages);

    // useEffect with subscribe that we need each time user selects another UserCard:
    useEffect(() => {
        const unsubscribe = messengerStore.subscribe(() => {

            const lastAction = messengerStore.getState().lastAction;
            console.log(lastAction);

            if (lastAction !== 'UpdateUnreadMessages') setMessages(messengerStore.getState().messages);

        });
        return () => unsubscribe();
    }, []);

    // updating the messages state each time we recieve a new message:
    useEffect(() => {
        socketIoService.getNewMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    useEffect(() => {
        socketIoService.getNewUnreadMessage((unreadMessage) => {
            unreadMessagesStore.dispatch({
                type: UnreadMessagesActionType.UpdateUnreadMessages,
                payload: unreadMessage,
            });
            console.log(unreadMessage);
        });
    }, []);

    return (
        <ScrollToBottom className="MessagesField">

            <div className="messages">
                {messages.length === 0
                    ? <p>messages will be displayed here</p>
                    : messages.map((m) => <Message key={m._id} message={m} />)}
            </div>

        </ScrollToBottom>
    );
}

export default MessagesField;
