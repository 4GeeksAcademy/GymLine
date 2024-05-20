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
        <div className="text-center">
            {store.user && store.user.rol === "admin" ? (
                <>
                    {store.products ? (
                        <>
                            {store.products.length > 0 ? (
                                store.products.map((product, index) => (
                                    <div className="container border" key={index}>
                                        product: {product.product} price: {product.price} image_product: {product.image_product} description: {product.description} type: {product.type} index: {index} stock: {product.stock}
                                        <i className="fa-solid fa-pen" onClick={() => handleEdit(product.id)}></i>
                                        <i className="fa-solid fa-trash-can" onClick={() => handleDelete(product.id)}></i>
                                    </div>
                                ))
                            ) : (
                                <p>No hay productos para mostrar.</p>
                            )}
                            <i className="fa-solid fa-plus" onClick={() => navigate("/shopmanagmentcreate")}></i>
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