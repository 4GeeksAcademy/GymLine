import React from "react";
import "../../styles/home.css";
/* import foto_producto from "../../img/equipamiento/Banda_de-_resistencia.jpg"; */
import { Link } from "react-router-dom";

const ProductCardEquipamiento = ({ product }) => {
  const cardRef = React.useRef();

  if (product.type !== "Equipamiento") {
    return null;

  }
  return (
    <Link to={`/product/${product.id}`} ref={cardRef}>
      <div class="card" style={{ width: "15rem" }}>
        <img src={`images/${product.image_product}`} // Ruta relativa a 'dist/images'
          className="card-img-top" alt={product.product} />
        <div class="card-body">
          <h5 className="card-title">{product.product}</h5>
          <p className="card-text">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardEquipamiento;