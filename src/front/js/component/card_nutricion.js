import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const ProductCardSuplementos = ({ product}) => {
  const cardRef = React.useRef();
  

  if (product.type !== "Suplementos Alimentarios") {
    return null;
  }

  return (
    <Link to={`/product/${product.id}`} ref={cardRef}>
      <div class="card" style={{ width: "15rem" }}>
        <img src={`../../img/assets/complementos_nutricionales/${product.image_product}`} className="card-img-top" alt={product.product} />
        <div class="card-body">
          <h5 className="card-title">{product.product}</h5>
          <p className="card-text">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardSuplementos;