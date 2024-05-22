import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cartempty = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        actions.deleteCar(store.user.id)
    }, []);


    return (
        <div className="container row" style={{ margin: "0 auto" }}>

            <div className="col-12 mt-4">


                <div className="login-container">
                    <div className="login-form">

                        <div className="">
                            <h3>GRACIAS POR LA COMPRA!</h3>
                        </div>
                        <div className="text-center">
                            <Link to="/shop" className="btn btn-primary">
                                Volver a comprar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cartempty;