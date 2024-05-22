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

  


  const navigate = useNavigate();
  const handleNavigate  = async () => {
    const success= await actions.deleteCar(store.user.id)
    if (success ) {
      console.log("Revision");
    actions.getProductCar(store.user.id)
    navigate('/shop');
    }
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
    <div className="container row" style={{ margin: "0 auto" }}>

      <div className="col-12 mt-4">
        {!store.carshop ? (
          <>
            <div className="login-container">
              <div className="login-form">

                <div className="">
                  <h3>La cesta está vacía</h3>
                </div>
                <div className="text-center">
                  <Link to="/shop" className="btn btn-primary">
                    Ir a comprar
                  </Link>
                </div>
              </div>
            </div>

          </>
        ) : (
          <>
            <div className="row d-flex justify-content-center align-items-center" >
              {store.carshop.map((item, index) => (
                <div className="border border-secondary d-flex justify-content-center align-items-center p-4 mb-2 col-7" style={{ height: "17em", width: "20em", marginRight: "24px" }} key={index}>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginRight: "10px" }}>
                    <h5 className="text-center">{item.product.product}</h5>
                    <h4 className="text-center">{item.product.price}</h4>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={`images/${item.product.image_product}`} style={{ height: "12em", width: "12em", objectFit: "cover" }} alt={item.product.product} />
                  </div>
                </div>
              ))}
              <button
                onClick={handleNavigate}
                className="btn btn-secondary">

                BORRAR CARRITO
              </button>
            </div>


            <hr />
            <div>
              <h5>PRECIO TOTAL: {store.total}</h5>

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
          </>

        )}

      </div>

    </div>

  );
};