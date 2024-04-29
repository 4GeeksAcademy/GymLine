import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";
const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage]=useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginSuccess = await actions.login(email, password);
        if (!loginSuccess) {
            setErrorMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <form className="mx-auto login_width">
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                    />
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>
            <button  className="btn btn-primary" type="submit" onClick={handleLogin}>
                Login
            </button>
            <Link to="/signup">
                    <button className="btn btn-info mx-5">Go to Register Page</button>
            </Link>
            {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
            </div>
        )}
        </form>
    );
};

export default Login;