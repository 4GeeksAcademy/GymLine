import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ShopManagmentCreate = () => {
    const { store, actions } = useContext(Context);
    const [newProduct, setNewProduct] = useState({
        product: "",
        price: 0,
        image_product: "",
        description: "",
        type: "",
        stock: 0
    });
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async () => {
        const { product, price, image_product, description, type, stock } = newProduct;
        const success = await actions.createProduct(product, price, image_product, description, type, stock);
        if (success) {
            navigate("/shopmanagment");
        }
    };

    const handleCancel = () => {
        navigate("/shopmanagment");
    };

    if (!store.user || store.user.rol !== "admin") {
        return <p>Acceso restringido. Esta página es solo para administradores.</p>;
    }

    return (
        <div className="text-center">
            <div className="container border">
                <p>Producto: <input type="text" name="product" value={newProduct.product} onChange={handleChange} /></p>
                <p>Precio: <input type="number" name="price" value={newProduct.price} onChange={handleChange} /></p>
                <p>Imagen: <input type="text" name="image_product" value={newProduct.image_product} onChange={handleChange} /></p>
                <p>Descripción: <input type="text" name="description" value={newProduct.description} onChange={handleChange} /></p>
                <p>Tipo: <input type="text" name="type" value={newProduct.type} onChange={handleChange} /></p>
                <p>Stock: <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} /></p>
                <button onClick={handleCreate}>Crear</button>
                <button onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default ShopManagmentCreate;