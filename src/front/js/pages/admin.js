import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Admin = () => {
    const navigate = useNavigate();
    const paypalOptions = {
        "client-id": process.env.CLIENT_ID
    };
    const orderTotal = 1500;

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
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
                <h1>Welcome Admin!</h1>
                <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(_, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: orderTotal
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

export default Admin;


