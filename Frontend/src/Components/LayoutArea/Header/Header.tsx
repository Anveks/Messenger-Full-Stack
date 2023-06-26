import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import "./Header.css";

function Header(): JSX.Element {

    const username = authStore.getState().user?._doc.username;

    return (
        <div className="Header">

            <p className="title">Chat App</p>

            {authStore.getState().user !== null && <p className="username">Logged in as: {username}</p>}

            <div className="menu"> Settings <Logout /></div>
        </div>
    );
}

export default Header;
