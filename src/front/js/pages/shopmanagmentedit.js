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
        <div className="text-center">
            <div className="container border">
                <p>Producto: <input type="text" name="product" value={editedProduct.product} onChange={handleChange} /></p>
                <p>Precio: <input type="number" name="price" value={editedProduct.price} onChange={handleChange} /></p>
                <p>Imagen: <input type="text" name="image_product" value={editedProduct.image_product} onChange={handleChange} /></p>
                <p>Descripción: <input type="text" name="description" value={editedProduct.description} onChange={handleChange} /></p>
                <p>Tipo: <input type="text" name="type" value={editedProduct.type} onChange={handleChange} /></p>
                <p>Stock: <input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} /></p>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default ShopManagementEdit;