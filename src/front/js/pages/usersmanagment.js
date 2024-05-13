import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Usersmanagment = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        } else if (store.user && store.user.rol === "admin") {
            actions.getAllUsers();
        }
            
    }, [store.logged, store.user]);


    return (
        <div className="text-center">
        {store.user && store.user.rol === "admin" ? (
            <>
                {store.users ? (
                    store.users.length > 0 ? (
                        store.users.map((user, index) => (
                            <div className="container border" key={index}>
                                email: {user.email} password: {user.password} nickname: {user.nickname} name: {user.name} lastname: {user.lastname} rol: {user.rol} index: {index} userid: {user.id}
                            </div>
                        ))
                    ) : (
                        <p>No hay usuarios para mostrar.</p>
                    )
                ) : (
                    <p>Cargando usuarios...</p>
                )}
            </>
        ) : (
            <p>Acceso restringido. Esta página es solo para administradores.</p>
        )}
    </div>
    );
};

export default Usersmanagment;