import Logout from "../../AuthArea/Logout/Logout";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <p className="title">Chat App</p>

            <div className="menu"> Settings <Logout /></div>
        </div>
    );
}

export default Header;
