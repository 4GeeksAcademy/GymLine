import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import { useParams, useNavigate } from 'react-router-dom';

export const Product = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate();
    const isLoged = store.logged;

    const handleClick = () => {
        if (!isLoged) {
            navigate('/login');
        } else {
            actions.addProductCar(store.user.id, uid);
        }
    };

    useEffect(() => {
        actions.getDataProduct(uid);
    }, []);

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-12 col-md-6 d-flex justify-content-center mb-3 mb-md-0">
                    <img
                        src={`../images/${store.dataProduct?.image_product}`}
                        className="img-fluid"
                        alt="foto producto"
                    />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <h2>{store.dataProduct?.product}</h2>
                    <p>{store.dataProduct?.description}</p>
                    <h4><b>{store.dataProduct?.price}€</b></h4>
                    <div className="button_slide slide_left" /* style={{width: "30em", height: "5em"}} */> 
                    <br/>
                    <button
                        type="button"
                        className="button-none text-carrito alig-text-center"
                        onClick={handleClick}> 
                        {isLoged ? <h5>AÑADIR AL CARRITO Y SEGUIR COMPRANDO</h5> : <h5>NECESITAS ESTAR REGISTRADO PARA COMPRAR</h5>}
                    </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
