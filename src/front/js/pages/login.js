import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/index.css";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginSuccess = await actions.login(email, password);
        if (!loginSuccess) {
            setErrorMessage("Revisa tus creedenciales, error al intentar iniciar sesión.");
        } else {
            if (store.user.rol === "member") {
                navigate("/member");
            } else if (store.user.rol === "coach") {
                navigate("/coach");
            } else {
                navigate("/adminview");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                        <Link to="/signup">
                            <button className="btn btn-info mx-5">Ir a la página de registro</button>
                        </Link>
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
