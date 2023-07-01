import { useEffect, useState } from "react";
import UnreadMessageModel from "../../../Models/UnreadMessageModel";
import messengerService from "../../../Services/MessengerService";
import notifyService from "../../../Services/NotifyService";
import socketIoService from "../../../Services/SocketIoService";
import "./UserCard.css";
import { unreadMessagesStore } from "../../../Redux/UnreadMessagesState";
import { usersStore } from "../../../Redux/UsersState";

function UserCard(props: any): JSX.Element {

    const { email, firstName, lastName, isOnline, username, _id, profilePicture } = props.user;
    const [unreadMessages, setUnreadMessages] = useState<UnreadMessageModel[]>(unreadMessagesStore.getState().unreadMessages.filter((m) => m.sender === _id));
    const activeUser = _id === usersStore.getState().activeUser;

    useEffect(() => {
        messengerService.getUnreadMessages();
    }, []);

    useEffect(() => {
        const unsubscribe = unreadMessagesStore.subscribe(() => {
            setUnreadMessages(unreadMessagesStore.getState().unreadMessages.filter((m) => m.sender === _id));
        });
        return () => unsubscribe();
    }, []);

    // get updated status here? 
    const [online, setOnline] = useState<boolean>(isOnline);

    useEffect(() => {
        socketIoService.getUdpatedStatus((data) => {
            if (data.userId === _id) setOnline(data.isOnline);
        })
    }, []);

    function handleClick() {
        props.getId(_id);
        messengerService.clearUnreadMessages(_id);
    }

    return (
        <div className="UserCard" onClick={handleClick} style={{ backgroundColor: activeUser ? "gray" : "", color: activeUser ? "white" : "" }}>

            <img src={profilePicture} alt="profilePicture" />

            <div className="name-status">
                <p>{username}</p>
                <p style={{ color: online ? "yellowgreen" : "#ff8a69" }}>{online ? "Online" : "Offline"}</p>
            </div>


            <div className="unread" style={{ backgroundColor: unreadMessages.length === 0 ? "transparent" : "orange" }}></div>
        </div >
    );
}

export default UserCard;


