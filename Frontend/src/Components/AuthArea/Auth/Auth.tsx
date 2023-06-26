import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthMode } from "../../../Models/AuthEnum";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import socketIoService from "../../../Services/SocketIoService";
import './Auth.css';

function Login(): JSX.Element {

    const [authState, setAuthState] = useState(AuthMode.Login); // Login by default
    let { register, handleSubmit } = useForm(); // had to omit the Model check here
    const navigate = useNavigate();

    async function submit(authData: any) { // had to omit the validation check of authData
        if (authState === AuthMode.Login) {
            try {
                // login
                await authService.login(authData);
                notifyService.success("Welcome back!");

                // update online status
                socketIoService.updateOnlineStatus(true);

                navigate("/")
            } catch (err: any) {
                notifyService.error(err);
            }
        } else {
            try {
                await authService.register(authData);
                notifyService.success("Welcome!");
                navigate("/home");
            }
            catch (err: any) {
                notifyService.error(err);
            }
        };
    }

    if (authState === AuthMode.Login) return (
        <div className="Login">
            <h3>Chat App Login</h3>
            <hr />
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="example@mail.com" {...register("email")} />


                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="*******" {...register("password")} />

                <button>login</button>
            </form>

            <p>Haven't registered yet? <a onClick={() => { setAuthState(AuthMode.Register) }}>Join us.</a></p>
        </div>
    );

    return (
        <div className="Register">
            <h3>Chat App Register</h3>
            <hr />

            <form onSubmit={handleSubmit(submit)}>
                <label>First Name:</label>
                <input type="text" name="firstName" placeholder="John" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="text" name="lastName" placeholder="Doe" {...register("lastName")} />

                <label>Email:</label>
                <input type="email" name="email" placeholder="example@mail.com" {...register("email")} />

                <label>Password:</label>
                <input type="password" name="password" placeholder="1234567" {...register("password")} />

                <label>Username:</label>
                <input type="text" name="username" placeholder='John_Doe' {...register("username")} />

                <label>Profile Picture:</label>
                <input type="file" name="profilePicture" {...register("profilePicture")} />

                <button>register</button>
            </form>

            <p>Have an account? <a onClick={() => { setAuthState(AuthMode.Login) }}>Login.</a></p>
        </div>
    );
}

export default Login;
