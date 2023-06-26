import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import { UnreadMessagesActionType, unreadMessagesStore } from "../../../Redux/UnreadMessagesState";
import { UsersActionType, usersStore } from "../../../Redux/UsersState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import socketIoService from "../../../Services/SocketIoService";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        socketIoService.updateOnlineStatus(false);
        authService.logout();

        // resetting the data stored in redux:
        messengerStore.dispatch({ type: MessengerActionType.Reset });
        unreadMessagesStore.dispatch({ type: UnreadMessagesActionType.Reset });
        usersStore.dispatch({ type: UsersActionType.Reset });

        notifyService.success("Come back soon!");
        navigate('/messenger/login ');
    }
    return (
        <div className="Logout">
            <a className="logout" onClick={logout}> Logout <LogoutIcon /></a>
        </div>
    );
}

export default Logout;
