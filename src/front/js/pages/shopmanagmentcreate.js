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
        type: "equipamiento",
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
        <div className="shopmanagement-edit-container">
            <div className="product-form">
                <h2>Crear Producto</h2>
                <div className="form-group">
                    <label>Producto:</label>
                    <input type="text" name="product" value={newProduct.product} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Imagen:</label>
                    <input type="text" name="image_product" value={newProduct.image_product} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea name="description" value={newProduct.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <select name="type" value={newProduct.type} onChange={handleChange}>
                        <option value="equipamiento">Equipamiento</option>
                        <option value="calistenia">Calistenia</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="suplementacion">Suplementación</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button className="btn save-btn" onClick={handleCreate}>Crear</button>
                    <button className="btn cancel-btn" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ShopManagmentCreate;
