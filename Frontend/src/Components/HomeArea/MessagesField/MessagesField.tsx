import { useEffect, useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import SendBar from "../SendBar/SendBar";
import "./MessagesField.css";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';
import { authStore } from "../../../Redux/AuthState";
import socketIoService from "../../../Services/SocketIoService";

function MessagesField(props: any): JSX.Element {

    const [messages, setMessages] = useState<MessageModel[]>(messengerStore.getState().messages);

    useEffect(() => {
        const unsubscribe = messengerStore.subscribe(() => {
            setMessages(messengerStore.getState().messages);
        });

        return () => unsubscribe();

    }, []);

    useEffect(() => {
        socketIoService.getNewMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
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
