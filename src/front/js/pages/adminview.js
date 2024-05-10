import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Adminview = () => {
    console.log("hasta los cullons")
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log("hola adminview")
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    console.log("estoy en adminview")
    return (
        <div className="text-center">
            {store.logged && store.user && store.user.rol === "admin" ? (
                <div>
                    <h1>Bienvenido {store.user.name}, ¿Qué deseas revisar hoy?</h1>
                </div>
            ) : store.logged == false ? (
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
                <div className="button-container-adminview">
                    <Link to="/shopmanagment">
                        <button className="button-adminview">Tienda</button>
                    </Link>
                    <Link to="/usersmanagment">
                        <button className="button-adminview">Usuarios</button>
                    </Link>
                    <Link to="/gymmanagment">
                        <button className="button-adminview">Gimnasio</button>
                    </Link>
             </div>
            )}
        </div>
    );
};

export default Adminview;