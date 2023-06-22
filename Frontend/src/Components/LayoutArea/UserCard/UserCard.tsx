import { useEffect, useState } from "react";
import UnreadMessageModel from "../../../Models/UnreadMessageModel";
import messengerService from "../../../Services/MessengerService";
import notifyService from "../../../Services/NotifyService";
import socketIoService from "../../../Services/SocketIoService";
import "./UserCard.css";

function UserCard(props: any): JSX.Element {

    const { email, firstName, lastName, isOnline, username, _id } = props.user;

    const [unreadMessages, setUnreadMessages] = useState<UnreadMessageModel[]>([]);

    useEffect(() => {
        messengerService.getUnreadMessages().then((res) => setUnreadMessages(res)).catch((err) => notifyService.error(err.message));
    }, []);

    const currentUnreadMessages = unreadMessages.filter((m) => m.sender === _id);

    // get updated status here? 
    const [online, setOnline] = useState<boolean>(isOnline);

    useEffect(() => {
        socketIoService.getUdpatedStatus((data) => {
            if (data.userId === _id) setOnline(data.isOnline);
        })
    }, []);

    function handleClick() {
        props.getId(props.user._id)
    }

    return (
        <div className="UserCard" onClick={handleClick}>
            <div className="name-status">
                <p>{username}</p>
                <p style={{ color: online ? "yellowgreen" : "red" }}>{online ? "Online" : "Offline"}</p>

            </div>


            <div className="unread" style={{ backgroundColor: currentUnreadMessages.length > 0 ? "orange" : "none" }}>{currentUnreadMessages.length > 0 ? currentUnreadMessages.length : null}</div>
        </div >
    );
}

export default UserCard;


