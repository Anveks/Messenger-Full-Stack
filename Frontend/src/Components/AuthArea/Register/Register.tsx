import { Link } from "react-router-dom";

function Register(): JSX.Element {
    return (
        <div className="Register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>

                <div className="card-body">
                    {/* TODO: add form action later */}
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="username">User Name: </label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="JohnDoe123"
                                id="username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="example@mail.com"
                                id="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="12345"
                                id="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input
                                type="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="12345"
                                id="confirmPassword" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input
                                type="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="12345"
                                id="confirmPassword" />
                        </div>

                        <div className="form-group">
                            <div className="file-image">
                                <div className="image"></div>
                            </div>

                            <div className="file">
                                <label htmlFor="file">Upload Image:: </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file" />
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="register" className="btn" />
                        </div>

                        <p>Already have an account? <Link to={"/messenger/login"}>Login</Link>.</p>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Register;
