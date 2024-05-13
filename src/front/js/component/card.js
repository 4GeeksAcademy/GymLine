import React from "react";
import "../../styles/home.css";
/* import foto_producto from "../../img/equipamiento/Banda_de-_resistencia.jpg"; */
import { Link } from "react-router-dom";

const ProductCard = ({ product}) => {
  const cardRef = React.useRef();

  return (
    <Link to={`/product/${product.id}`} ref={cardRef}>
      <div class="card" style={{ width: "15rem" }}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div class="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;