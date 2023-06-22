import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import socketIoService from "../../../Services/SocketIoService";
import messengerService from "../../../Services/MessengerService";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            // login
            await authService.login(credentials);
            notifyService.success("Welcome back!");

            // update online status
            socketIoService.updateOnlineStatus(true);

            navigate("/")
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login">
            <h3>this is a login page</h3>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" {...register("email")} />


                <label htmlFor="password">Password</label>
                <input type="password" name="password" {...register("password")} />

                <button>login</button>
            </form>
        </div>
    );
}

export default Login;
