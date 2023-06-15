import { useEffect, useState } from "react";
import "./UsersMenu.css";
import UserModel from "../../../Models/UserModel";
import messengerService from "../../../Services/MessengerService";
import notifyService from "../../../Services/NotifyService";
import UserCard from "../UserCard/UserCard";
import { authStore } from "../../../Redux/AuthState";

function UsersMenu(): JSX.Element {
    const [users, setUsers] = useState<UserModel[]>([]);
    useEffect(() => {
        messengerService
            .getAllUsers()
            .then((res) => setUsers(res))
            .catch((err: any) => { notifyService.error(err.message) });
    }, []);

    function handleMessagesHistory(id: string) {
        messengerService.getMessageHistory(id);

        // create a socket.io room/join if exists:

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
