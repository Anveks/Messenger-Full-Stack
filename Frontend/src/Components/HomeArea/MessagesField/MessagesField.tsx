import { useEffect, useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import SendBar from "../SendBar/SendBar";
import "./MessagesField.css";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';
import { authStore } from "../../../Redux/AuthState";
import socketIoService from "../../../Services/SocketIoService";

function MessagesField(): JSX.Element {

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

    const recepientId = messengerStore.getState().currentRecipientId;

    function handleSendMessage(messageContent: string) {
        const currentId = authStore.getState().user._doc._id;
        const roomName = [currentId, recepientId].sort().join("-");
        const message: any = {
            sender: authStore.getState().user._doc._id,
            recipient: recepientId,
            content: messageContent,
            timestamp: new Date().toISOString()
        };

        socketIoService.sendMessage(roomName, message);
    }



    return (
        <div className="MessagesField">

            <ScrollToBottom className="messages">
                {messages.length === 0
                    ? <p>messages will be displayed here</p>
                    : messages.map((m) => <Message key={m._id} message={m} getRecepientId={handleSendMessage} />)}
            </ScrollToBottom>

            <div className="sendBar"><SendBar getMessage={handleSendMessage} /></div>

        </div>
    );
}

export default MessagesField;
