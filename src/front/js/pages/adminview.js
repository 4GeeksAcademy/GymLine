import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Adminview = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    return (
        <div className="text-center adminview-container">
            {store.logged && store.user && store.user.rol === "admin" ? (
                <div>
                    <h1 className="welcome-message">Bienvenido {store.user.name}, ¿Qué deseas revisar hoy?</h1>
                </div>
            ) : store.logged === false ? (
                <div>
                    <h1>Authenticating</h1>
                    <p>Checking..................</p>
                </div>
            ) : (
                <div>
                    <h1>Unauthorized</h1>
                    <p>You only could access with the correct credentials.</p>
                </div>
            )}
            {store.logged && store.user && store.user.rol === "admin" && (
                <div className="sections-container">
                    <div className="section">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FFcddxkKtOuaw917QpUl64FlusvDaPIVTyCmh9yCVA&s" alt="Tienda" className="section-image" />
                        <p className="section-text">Gestiona tu tienda de manera eficiente y rápida.</p>
                        <Link to="/shopmanagment">
                            <button className="section-button button_slide slide_left">Tienda</button>
                        </Link>
                    </div>
                    <div className="section">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBNNHH2D3x_Vr1RfGdiq2KKIzf13R9qmncJg&s" alt="Usuarios" className="section-image" />
                        <p className="section-text">Administra tus usuarios y mantén todo en orden.</p>
                        <Link to="/usersmanagment">
                            <button className="section-button button_slide slide_left">Usuarios</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adminview;
