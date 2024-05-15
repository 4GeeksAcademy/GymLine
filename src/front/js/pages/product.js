import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/assets/equipamiento/Banda_de-_resistencia.jpg";
import "../../styles/home.css";
import { useParams } from 'react-router-dom';

export const Product = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();

    useEffect(() => {
        console.log(uid);
        actions.getDataProduct(uid);
    }, []);

    console.log(store.dataProduct);

    return (
        <div className="container border border-danger">
            <div className="col-12 col-md-12 d-flex border border-danger" style={{ width: "100%" }}>
                <div className="col-6">
                    <img src={store.dataProduct?.image_product} style={{ width: "90%", height: "90%" }} alt="foto producto" />
                </div>
                <div className="col-6">
                    <h2>{store.dataProduct?.product}</h2>
                    <br />
                    <p>{store.dataProduct?.description}</p>
                    <br />
                    <h4><b>{store.dataProduct?.price}€</b></h4>
                    <br /> 
                    <button
                        type="button"

                         onClick={() => {
                            const name = `${product.product}`;
                            const isBuy = store.favourites.includes(name)

                            if (isBuy) {
                                console.log(name + "true")
                                actions.deleteCart(name);
                            } else {
                                console.log(name + "false")
                                actions.addCart(name);
                            }
                        }}> 
                        <p>AÑADIR AL CARRRITO</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
