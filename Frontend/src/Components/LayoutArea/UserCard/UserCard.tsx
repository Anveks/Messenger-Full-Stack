import { useEffect, useState } from "react";
import "./UserCard.css";
import socketIoService from "../../../Services/SocketIoService";
import { messengerStore } from "../../../Redux/MessengerState";
import { usersStore } from "../../../Redux/UsersState";

function UserCard(props: any): JSX.Element {

    const { email, firstName, lastName, isOnline, username, _id } = props.user;

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
            <p>{username}</p>
            <p style={{ color: online ? "yellowgreen" : "red" }}>{online ? "Online" : "Offline"}</p>
        </div>
    );
}

export default UserCard;


