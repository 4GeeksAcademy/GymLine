import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/equipamiento/Banda_de-_resistencia.jpg";
import "../../styles/home.css";

export const Product = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container border border-danger">
            <div className="col-12 col-md-12 d-flex border border-danger" style={{ width: "100%" }}>
                <div className="col-6">
                    <img src={rigoImageUrl} style={{ width: "90%", height: "90%" }} alt="foto producto" />
                </div>
                <div className="col-6">
                    <h2>BANDA DE RESISTENCIA</h2>
                    <br/>
                    <p>Banda de resistencia de látex natural de alta calidad, perfecta para ejercicios de estiramiento, fortalecimiento muscular y rehabilitación.</p>
                    <br/>
                    <h4><b>38€</b></h4>
                </div>
            </div>
        </div>
    );
};
