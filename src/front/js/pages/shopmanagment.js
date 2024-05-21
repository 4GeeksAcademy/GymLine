import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Shopmanagment = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        } else if (store.user && store.user.rol === "admin") {
            actions.getProducts();
        }
    }, [store.logged, store.user]);

    const handleEdit = (e) => {
        navigate("/shopmanagmentedit/" + e);
    };

    const handleDelete = async (e) => {
        const success = await actions.deleteProduct(e);
        if (success) {
            actions.getProducts();
        } 
    };

    return (
        <div className="shopmanagment-container">
            {store.user && store.user.rol === "admin" ? (
                <>
                    {store.products ? (
                        <>
                            {store.products.length > 0 ? (
                                store.products.map((product, index) => (
                                    <div className="product-card" key={index}>
                                        <img src={product.image_product} alt={product.product} className="product-image" />
                                        <div className="product-details">
                                            <h2 className="product-title">{product.product}</h2>
                                            <p className="product-description">{product.description}</p>
                                            <p className="product-price">Precio: {product.price}€</p>
                                            <p className="product-stock">Stock: {product.stock}</p>
                                            <div className="product-actions">
                                                <i className="fa-solid fa-pen edit-icon" onClick={() => handleEdit(product.id)}></i>
                                                <i className="fa-solid fa-trash-can delete-icon" onClick={() => handleDelete(product.id)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay productos para mostrar.</p>
                            )}
                            <div className="add-product">
                                <i className="fa-solid fa-plus add-icon" onClick={() => navigate("/shopmanagmentcreate")}></i>
                            </div>
                        </>
                    ) : (
                        <p>Cargando productos...</p>
                    )}
                </>
            ) : (
                <p>Acceso restringido. Esta página es solo para administradores.</p>
            )}
        </div>
    );
};

export default Shopmanagment;