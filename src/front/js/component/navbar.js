import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";


export const Navbar = () => {

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
		<header className="d-flex justify-content-between align-items-center py-3">
			<div className="logo">
				<a href="/" className="d-flex align-items-center">
					<img src="logo" alt="Logo" className="me-2" />

				</a>
			</div>
			<div className="d-flex align-items-center">
				<button className="btn btn-secondary me-2">SHOP</button>
				<button className="btn btn-secondary me-2">GYM</button>
				<button
					className="btn btn-secondary me-2"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					ACCEDER
				</button>
				<div className="dropdown-menu">
					<form className="px-4 py-3">
						<div className="mb-3">
							<input
								type="email"
								className="form-control"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Tu correo"
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Contraseña"
							/>
						</div>
						<div className="mb-3">
							<div className="form-check">
								<input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
								<label className="form-check-label" htmlFor="dropdownCheck">
									Recuerdame
								</label>
							</div>
						</div>
						<button type="submit" onClick={handleLogin} className="btn btn-primary">Acceder</button>
					</form>
					<div className="dropdown-divider"></div>
					<Link to="/signup">
					<a className="dropdown-item" href="#">Eres nuevo por aquí? Registrate!</a>
					</Link>
				{/* <a class="dropdown-item" href="#">Forgot password?</a> */}
				</div>
				<button className="btn btn-secondary">
					<i className="fa-solid fa-cart-shopping"></i>
				</button>
			</div>
			{errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                </div>
            )}
		</header>
	);


};

