import { useNavigate } from "react-router-dom";
import "./Logout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { authStore, AuthActionType } from "../../../Redux/AuthState";
import socketIoService from "../../../Services/SocketIoService";
import { MessengerActionType, messengerStore } from "../../../Redux/MessengerState";
import { UnreadMessagesActionType, unreadMessagesStore } from "../../../Redux/UnreadMessagesState";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        socketIoService.updateOnlineStatus(false);
        authService.logout();
        // resetting the data stored in redux:
        messengerStore.dispatch({ type: MessengerActionType.Reset });
        unreadMessagesStore.dispatch({ type: UnreadMessagesActionType.Reset });
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
