import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Usersmanagment = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!store.logged) {
                await actions.verifyAuthToken();
            }
            if (store.user && store.user.rol === "admin") {
                await actions.getAllUsers();
            }
        };
        fetchData();
    }, [store.logged, store.user, actions]);

    const handleEdit = (e) => {
        navigate("/usermanagmentedit/" + e);
    };

    const handleDelete = async (e) => {
        const success = await actions.deleteUser(e);
        if (success) {
            actions.getAllUsers();
        } 
    };

    if (!store.user || store.user.rol !== "admin") {
        return <p>Acceso restringido. Esta página es solo para administradores.</p>;
    }

    return (
        <div className="shopmanagment-container">
            <div className="product-form">
                <h2>Gestión de Usuarios</h2>
                {store.users ? (
                    store.users.length > 0 ? (
                        store.users.map((user, index) => (
                            <div className="container border user-item" key={index}>
                                <p>Email: {user.email}</p>
                                <p>Contraseña: {user.password}</p>
                                <p>Nickname: {user.nickname}</p>
                                <p>Nombre: {user.name}</p>
                                <p>Apellido: {user.lastname}</p>
                                <p>Rol: {user.rol}</p>
                                <p>Usuario ID: {user.id}</p>
                                <div className="form-actions">
                                    <i className="fa-solid fa-pen edit-icon" onClick={() => handleEdit(user.id)}></i>
                                    <i className="fa-solid fa-trash-can delete-icon" onClick={() => handleDelete(user.id)}></i>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay usuarios para mostrar.</p>
                    )
                ) : (
                    <p>Cargando usuarios...</p>
                )}
            </div>
        </div>
    );
};

export default Usersmanagment;