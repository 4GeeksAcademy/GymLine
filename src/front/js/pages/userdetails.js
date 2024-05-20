import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log(store.user.id);
        actions.getDataUser(store.user.id);
    }, []);

    const navigate = useNavigate();

    const handleNavigate = () => {
        actions.logout();
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <div className="col-12">
                    <h2>Datos del Usuario</h2>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-6">
                    <label className="form-label">Apellido:</label>
                    <p className="form-control">{store.userData?.lastname}</p>
                </div>
                <div className="col-6">
                    <label className="form-label">Nombre:</label>
                    <p className="form-control">{store.userData?.name}</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-6">
                    <label className="form-label">Apodo:</label>
                    <p className="form-control">{store.userData?.nickname}</p>
                </div>
                <div className="col-6">
                    <label className="form-label">Rol:</label>
                    <p className="form-control">{store.userData?.rol}</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <label className="form-label">Correo Electrónico:</label>
                    <p className="form-control">{store.userData?.email}</p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <button onClick={handleNavigate} className="btn btn-primary">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;