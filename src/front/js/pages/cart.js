import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Cart = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductCar(store.user.id)
  }, []);

  useEffect(() => {
    actions.getProductCar(store.user.id)
  }, [store.carshop]);


  const navigate = useNavigate();
  const handleNavigate = () => {
    actions.deleteCar(store.user.id)
    navigate('/shop');
  };


  const paypalOptions = {
    "client-id": process.env.CLIENT_ID
  };
 
  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // showTransactionAlert(details.payer.name.given_name);
      navigate('/CarEmpty');
    });
  };
  const showTransactionAlert = (payerName) => {
    const message = 'Transacción completada por ' + payerName;
    alert(message);
  };


  return (
    <div className="container" style={{ height: "100%" }}>
      <div className="row">
        {!store.carshop ? (
          <>
            <div className="col-12">
              <h3>La cesta está vacía</h3>
            </div>
            <div className="col-12 text-center">
              <Link to="/shop" className="btn btn-primary">
                Ir a comprar
              </Link>
            </div>
          </>
        ) : (
          <>
            {store.carshop.map((item, index) => (
              <div className="col-12 border border-secondary d-flex justify-content-center align-items-center p-2 mb-2" style={{ height: "20%", width: "30%" }} key={index}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginRight: "10px" }}>
                  <h4 className="text-center">{item.product.product}</h4>
                  <h3 className="text-center">{item.product.price}</h3>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={`images/${item.product.image_product}`} style={{ height: "50%", width: "100%", objectFit: "cover" }} alt="Product" />
                </div>
              </div>
            ))}


            <button
              onClick={handleNavigate}
              className="btn btn-secondary">

              BORRAR CARRITO
            </button>
            <hr />
            <h5>PRECIO TOTAL: {store.total}</h5>
          </>
        )}
      </div>
      <div>
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: store.total
                  }
                }
              ]
            });
          }}
          onApprove={handleApprove}
        />
      </PayPalScriptProvider>
      </div>
    </div>
  );
};