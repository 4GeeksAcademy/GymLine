import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const ProductCardAccesorio = ({ product }) => {
  const cardRef = React.useRef();

  // Check if the product type is "Accesorio"
  if (product.type !== "Accesorios") {
    return null;
  }

  return (
    <Link to={`/product/${product.id}`} ref={cardRef} style={{textDecoration:"none", color: "black"}}>
      <div class="card" style={{ width: "15rem", height:"100%"  }}>
        <img src={`images/${product.image_product}`} className="card-img-top" alt={product.product} />
        <div class="card-body">
          <h5 className="card-title">{product.product}</h5>
          <p className="card-text">{product.price}€</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardAccesorio;