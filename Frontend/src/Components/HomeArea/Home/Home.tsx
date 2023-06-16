import { useEffect, useState } from "react";
import MessagesField from "../MessagesField/MessagesField";
import SendBar from "../SendBar/SendBar";
import "./Home.css";
import { authStore } from "../../../Redux/AuthState";
import { messengerStore } from "../../../Redux/MessengerState";
import socketIoService from "../../../Services/SocketIoService";

function Home(): JSX.Element {

    const [recipientId, setRecipientId] = useState<string>(messengerStore.getState().currentRecipientId);

    useEffect(() => {
        const unsubscribe = messengerStore.subscribe(() => {
            setRecipientId(messengerStore.getState().currentRecipientId);
        });

        return () => unsubscribe();
    });

    function handleSendMessage(messageContent: string) {
        const currentId = authStore.getState().user._doc._id;
        const roomName = [currentId, recipientId].sort().join("-");
        const message: any = {
            sender: authStore.getState().user._doc._id,
            recipient: recipientId,
            content: messageContent,
            timestamp: new Date().toISOString()
        };

        socketIoService.sendMessage(roomName, message);
    }


    return (
        <div className="Home">
            <MessagesField />
            <div className="sendBarContainer">
                <SendBar getMessage={handleSendMessage} />
            </div>
        </div>
    );
}

export default Home;
