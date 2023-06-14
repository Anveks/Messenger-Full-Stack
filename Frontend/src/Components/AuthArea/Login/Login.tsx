import CredentialsModel from "../../../Models/CredentialsModel";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Redux/AuthState";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    console.log(authStore.getState().user);

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            console.log(authStore.getState().user);
            notifyService.success("Welcome back!");
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
