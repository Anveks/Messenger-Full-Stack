import { useEffect, useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import SendBar from "../SendBar/SendBar";
import "./MessagesField.css";
import { messengerStore } from "../../../Redux/MessengerState";
import Message from "../Message/Message";
import ScrollToBottom from 'react-scroll-to-bottom';

function MessagesField(): JSX.Element {

    const [messages, setMessages] = useState<MessageModel[]>(messengerStore.getState().messages);

    useEffect(() => {

        const unsubscribe = messengerStore.subscribe(() => {
            setMessages(messengerStore.getState().messages);
        });

        return () => unsubscribe();

    }, []);

    function handleSendMessage() {

    }


    return (
        <div className="MessagesField">

            <ScrollToBottom className="messages">
                {messages.length === 0
                    ? <p>messages will be displayed here</p>
                    : messages.map((m) => <Message key={m._id} message={m} getMessage={handleSendMessage} />)}
            </ScrollToBottom>

            <div className="sendBar"><SendBar /></div>

        </div>
    );
}

export default MessagesField;
