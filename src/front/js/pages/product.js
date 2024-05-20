import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import { useParams, Navigate, useNavigate } from 'react-router-dom';

export const Product = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate(); // Hook para redirigir
    const isLoged = store.logged;

    

    const handleClick = () => {
        if (!isLoged) {
          navigate('/login'); // Redirige al login si no está logueado
        } else {
          const name = store.dataProduct?.product;
          const isBuy = store.cart.includes(name);
          const price = store.dataProduct?.price;
    
          if (isBuy) {
            console.log(name + "true");
            actions.deleteCart(name, price);
          } else {
            console.log(name + "false");
            actions.addCart(name, price);
          }
        }
      };

    useEffect(() => {
        console.log(uid);
        actions.getDataProduct(uid);
    }, []);

    console.log(store.dataProduct?.image_product);

    return (
        
        <div className="container border border-danger">
            <div className="col-12 col-md-12 d-flex border border-danger mt-3" style={{ width: "100%" }}>
                <div className="col-6">
                    <img src={`../images/${store.dataProduct?.image_product}`}  style={{ width: "90%", height: "90%" }} alt="foto producto" />
                </div>
                <div className="col-6">
                    <h2>{store.dataProduct?.product}</h2>
                    <br />
                    <p>{store.dataProduct?.description}</p>
                    <br />
                    <h4><b>{store.dataProduct?.price}€</b></h4>
                    <br /> 
                    <div className="button_slide slide_left align-text"> 
                    <button
                        type="button"
                        className="button-none text-carrito"
                        onClick={handleClick}> 
                        {isLoged ? ' AÑADIR AL CARRITO' : 'NECESITAS ESTAR REGISTRADO PARA COMPRAR'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
