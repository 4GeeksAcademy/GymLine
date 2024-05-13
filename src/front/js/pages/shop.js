import React from "react";
import ProductCard from "../component/card";
import "../../styles/home.css";

const products = [
  {
    id: 1,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 2,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 3,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 4,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 5,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 6,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  },
  {
    id: 7,
    name: "NOMBRE PRODUCTO 1",
    price: "PRECIO 1",
    image: "../../img/equipamiento/Banda_de-_resistencia.jpg",
  }
];

const Shop = () => {
  const scrollRef = React.useRef();
  const scrollRef2 = React.useRef();
  const scrollRef3 = React.useRef();
  const scrollRef4 = React.useRef();
  const scrollToNext = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const scrollToPrevious = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  const scrollToNext2 = () => {
    scrollRef2.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const scrollToPrevious2 = () => {
    scrollRef2.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  const scrollToNext3 = () => {
    scrollRef3.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const scrollToPrevious3 = () => {
    scrollRef3.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  const scrollToNext4 = () => {
    scrollRef4.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const scrollToPrevious4 = () => {
    scrollRef4.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

{/* ----------------------------------------------------------------------------
 */}

  return (
    <div className="container">
      <div className="mt-4" style={{ marginLeft: "15%", marginRight: "15%" }}>
        <div className="col-12 col-md-12" style={{ width: "100%" }}>
          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Equipamiento</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative",scrollbarWidth:"none" }} ref={scrollRef}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} scrollToNext={scrollToNext} scrollToPrevious={scrollToPrevious} />
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4" style={{ width: "100%" }}>
            <div className="arrows" onClick={scrollToPrevious}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="arrows" onClick={scrollToNext}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>

{/* ----------------------------------------------------------------------------
 */}

          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Calistenia</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative", scrollbarWidth:"none" }} ref={scrollRef2}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} scrollToNext={scrollToNext2} scrollToPrevious={scrollToPrevious2} />
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4" style={{ width: "100%" }}>
            <div className="arrows" onClick={scrollToPrevious2}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="arrows" onClick={scrollToNext2}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>

{/* ----------------------------------------------------------------------------
 */}

          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Accesorios</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative",scrollbarWidth:"none" }} ref={scrollRef3}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} scrollToNext={scrollToNext3} scrollToPrevious={scrollToPrevious3} />
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4" style={{ width: "100%" }}>
            <div className="arrows" onClick={scrollToPrevious3}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="arrows" onClick={scrollToNext3}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>

{/* ----------------------------------------------------------------------------
 */}
          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Suplementación Alimentaria</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative",scrollbarWidth:"none" }} ref={scrollRef4}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} scrollToNext={scrollToNext4} scrollToPrevious={scrollToPrevious4} />
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4" style={{ width: "100%" }}>
            <div className="arrows" onClick={scrollToPrevious4}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="arrows" onClick={scrollToNext4}>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;