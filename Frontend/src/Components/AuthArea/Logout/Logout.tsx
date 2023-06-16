import { useNavigate } from "react-router-dom";
import "./Logout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { authStore, AuthActionType } from "../../../Redux/AuthState";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    function logout(): void {
        authService.logout();
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
