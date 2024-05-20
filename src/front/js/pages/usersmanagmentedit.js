import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Usersmanagmentedit = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null); // Para almacenar los cambios en el usuario
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!store.logged) {
                await actions.verifyAuthToken();
            }
            if (store.user && store.user.rol === "admin") {
                if (store.users.length === 0) {
                    await actions.getAllUsers();
                }
                const selectedUser = store.users.find(u => u.id === parseInt(theid));
                setUser(selectedUser);
                setEditedUser({ ...selectedUser }); // Inicializar editedUser con los datos del usuario seleccionado
            }
        };
        fetchData();
    }, [store.logged, store.user, theid, store.users, actions]);

    const handleChange = e => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const { email, password, nickname, name, lastname } = editedUser;
        const success = await actions.modifyUser(theid, email, password, nickname, name, lastname);
        if (success) {
            navigate("/usermanagment");
        }
    };

    const handleCancel = () => {
        navigate("/usermanagment");
    };

    if (!store.user || store.user.rol !== "admin") {
        return <p>Acceso restringido. Esta página es solo para administradores.</p>;
    }

    if (!user) {
        return <p>Cargando usuario...</p>;
    }

    return (
        <div className="text-center">
            <div className="container border">
                <p>Email: <input type="text" name="email" value={editedUser.email} onChange={handleChange} /></p>
                <p>Contraseña: <input type="password" name="password" value={editedUser.password} onChange={handleChange} /></p>
                <p>Nickname: <input type="text" name="nickname" value={editedUser.nickname} onChange={handleChange} /></p>
                <p>Nombre: <input type="text" name="name" value={editedUser.name} onChange={handleChange} /></p>
                <p>Apellido: <input type="text" name="lastname" value={editedUser.lastname} onChange={handleChange} /></p>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default Usersmanagmentedit;