import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Usersmanagment = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        } else if (store.user && store.user.rol === "admin") {
            actions.getAllUsers();
        }
            
    }, [store.logged, store.user]);

    const handleEdit = (e) => {
        navigate("/usermanagmentedit/" + e);
    };
    const handleDelete = async (e) => {
        const success = await actions.deleteUser(e);
        if (success) {
            actions.getAllUsers();
        } 
    };

    return (
        <div className="text-center">
        {store.user && store.user.rol === "admin" ? (
            <>
                {store.users ? (
                    store.users.length > 0 ? (
                        store.users.map((user, index) => (
                            <div className="container border" key={index}>
                                email: {user.email} password: {user.password} nickname: {user.nickname} name: {user.name} lastname: {user.lastname} rol: {user.rol} index: {index} userid: {user.id}
                                <i className="fa-solid fa-pen" onClick={() => handleEdit(user.id)}></i>
                                <i class="fa-solid fa-trash-can"onClick={() => handleDelete(user.id)}></i>
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