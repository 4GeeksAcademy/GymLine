import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ShopManagementEdit = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [product, setProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null); // Para almacenar los cambios en el producto
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!store.logged) {
                await actions.verifyAuthToken();
            }
            if (store.user && store.user.rol === "admin") {
                if (store.products.length === 0) {
                    await actions.getProducts();
                }
                const selectedProduct = store.products.find(p => p.id === parseInt(theid));
                setProduct(selectedProduct);
                setEditedProduct({ ...selectedProduct }); // Inicializar editedProduct con los datos del producto seleccionado
            }
        };
        fetchData();
    }, [store.logged, store.user, theid, store.products, actions]);

    const handleChange = e => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const { product, price, image_product, description, type, stock } = editedProduct;
        const success = await actions.modifyProduct(theid, product, price, image_product, description, type, stock);
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

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="shopmanagement-edit-container">
            <div className="product-form">
                <h2>Editar Producto</h2>
                <div className="form-group">
                    <label>Producto:</label>
                    <input type="text" name="product" value={editedProduct.product} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Imagen:</label>
                    <input type="text" name="image_product" value={editedProduct.image_product} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea name="description" value={editedProduct.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Tipo:</label>
                    <select name="type" value={editedProduct.type} onChange={handleChange}>
                        <option value="Equipamiento">Equipamiento</option>
                        <option value="Calistenia">Calistenia</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Suplementos Alimentarios">Suplementación</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button className="btn save-btn" onClick={handleSave}>Guardar</button>
                    <button className="btn cancel-btn" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ShopManagementEdit;
