import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleToggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		if (store.cart.length > 0) {
			setIsDropdownOpen(true);
		} else {
			setIsDropdownOpen(false);
		}
	}, [store.cart]);

	
	

	const handleLogin = async (e) => {
		e.preventDefault();
		const loginSuccess = await actions.login(email, password);
		if (!loginSuccess) {
			setErrorMessage("Login failed. Please check your credentials.");
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

	const handleClick = (event) => {
		event.preventDefault();
		navigate('/');
	};

	return (
		<header className="navbar">
			<div className="navbar-container">
				<div className="logo">
					<a href="/adminview" className="d-flex align-items-center" onClick={handleClick}>
						<img src="logo" alt="Logo" className="me-2" />
					</a>
				</div>
				<button className="navbar-toggle" onClick={handleToggleMenu}>
					<i className="fas fa-bars"></i>
				</button>
				<nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
					<Link to="/shop" className="nav-link">
						<button className="btn btn-secondary">TIENDA</button>
					</Link>
					<Link to={store.logged ? `/profile` : "/login"} className="nav-link">
						<button className="btn btn-secondary">
							{store.logged ? store.user.name : "ACCEDER"}
						</button>
					</Link>
					{store.user && store.user.rol === "admin" && (
						<Link to="/adminview" className="nav-link">
							<button className="btn btn-secondary">Adminview</button>
						</Link>
					)}
					<div className="dropdown">
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							id="Button1"
							onClick={handleToggleDropdown}>
							<i className="fa-solid fa-cart-shopping"></i> <span className="counter">{store.counter}</span>
						</button>
						<ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton1">
							{store.cart.map((item, index) => (
								<li className="text-dark d-flex justify-content-between" key={index}>
									{item}
									<span className="bean">
										<i className="fas fa-trash" onClick={() => actions.deleteCart(item)}></i>
									</span>
								</li>
							))}
							<hr />
							<Link to="/cart">
								<button type="button" className="btn btn-secondary">
									Comprar
								</button>
							</Link>
						</ul>
					</div>
				</nav>
			</div>
			{errorMessage && (
				<div className="alert alert-danger mt-3" role="alert">
					{errorMessage}
				</div>
			)}
		</header>
	);
};
