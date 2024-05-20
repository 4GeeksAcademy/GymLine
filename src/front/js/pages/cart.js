import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="row">
        {store.cart.length === 0 ? (
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
            {store.cart.map((item, index) => (
              <div className="col-12 border border-secondary" key={index}>
                <li className="text-dark d-flex justify-content-between">
                  {item}
                  <span className="bean">
                    <i
                      className="fas fa-trash"
                      onClick={() => actions.deleteCart(item)}
                    ></i>
                  </span>
                </li>
              </div>
            ))}
            <hr />
            <h5>PRECIO TOTAL: {store.total}</h5>
          </>
        )}
      </div>
    </div>
  );
};