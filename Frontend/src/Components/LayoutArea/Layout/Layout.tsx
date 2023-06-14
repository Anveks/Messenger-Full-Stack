import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import UsersMenu from "../UsersMenu/UsersMenu";
import "./Layout.css";

function Layout(): JSX.Element {

    const [user, setUser] = useState<UserModel>(authStore.getState().user);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();
    }, []);

    if (user === null) return <div><Login /></div>

    return (
        <div className="Layout" >
            <header>
                <Header />
            </header>

            <aside>
                <UsersMenu />
            </aside>

            <main>
                <Routing />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
