import { useEffect, useState } from "react";
import "./UsersMenu.css";
import UserModel from "../../../Models/UserModel";
import messengerService from "../../../Services/MessengerService";
import notifyService from "../../../Services/NotifyService";
import UserCard from "../UserCard/UserCard";
import { authStore } from "../../../Redux/AuthState";
import socketIoService from "../../../Services/SocketIoService";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import { usersStore } from "../../../Redux/UsersState";

function UsersMenu(): JSX.Element {
    const [users, setUsers] = useState<UserModel[]>([]);
    useEffect(() => {
        messengerService
            .getAllUsers()
            .then((res) => setUsers(res))
            .catch((err: any) => { notifyService.error(err.message) });
    }, []);

    console.log(users);

    function handleMessagesHistory(id: string) {
        messengerService.getMessageHistory(id);

        // save recipient id in redux:
        messengerStore.dispatch({ type: MessengerActionType.UpdateRecipientId, payload: id });

        // join/create a socket.io room:
        const currentUserId = authStore.getState().user._doc._id;
        const roomName = [currentUserId, id].sort().join('-'); // creating a consistent pattern regardless if userId is different
        socketIoService.joinRoom(roomName);
    }

    return (
        <div className="UsersMenu">
            {users
                .filter((u) => u._id !== authStore.getState().user._doc._id) // filter yourself
                .map((u) => <UserCard key={u._id} user={u} getId={handleMessagesHistory} />)
            }
        </div>
    );
}

export default UsersMenu;
