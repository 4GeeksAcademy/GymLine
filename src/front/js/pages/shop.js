import React, { useState, useContext, useEffect } from "react";
import ProductCardEquipamiento from "../component/card_equipamiento";
import ProductCardAccesorios from "../component/card_accesorios";
import ProductCardCalistenia from "../component/card_calistenia";
import ProductCardNutricion from "../component/card_nutricion";
import "../../styles/home.css";
import { Context } from "../store/appContext";

const Shop = () => {
  const { store, actions } = useContext(Context);

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

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <div className="container">
      <div className="mt-4" style={{ marginLeft: "15%", marginRight: "15%" }}>
        <div className="col-12 col-md-12" style={{ width: "100%" }}>
          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Equipamiento</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative", scrollbarWidth: "none" }} ref={scrollRef}>
            {store.products.map((product) => (
              <ProductCardEquipamiento key={product.id} product={product} scrollToNext={scrollToNext} scrollToPrevious={scrollToPrevious} />
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

          {/* Other sections for Calistenia, Accesorios, and Suplementación Alimentaria */}

          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <h3 className="mb-3">Calistenia</h3>
          </div>
          <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative", scrollbarWidth: "none" }} ref={scrollRef2}>
            {store.products.map((product) => (
              <ProductCardCalistenia key={product.id} product={product} scrollToNext={scrollToNext2} scrollToPrevious={scrollToPrevious2} />
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

            <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
              <h3 className="mb-3">Accesorios</h3>
            </div>
            <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative", scrollbarWidth: "none" }} ref={scrollRef3}>
              {store.products.map((product) => (
                <ProductCardAccesorios key={product.id} product={product} scrollToNext={scrollToNext3} scrollToPrevious={scrollToPrevious3} />
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
          

        
            <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
              <h3 className="mb-3">Suplementación Alimentaria</h3>
            </div>
            <div className="d-flex border border-secondary" style={{ maxWidth: "100%", overflowX: "scroll", position: "relative", scrollbarWidth: "none" }} ref={scrollRef4}>
              {store.products.map((product) => (
                <ProductCardNutricion key={product.id} product={product} scrollToNext={scrollToNext4} scrollToPrevious={scrollToPrevious4} />
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4" style={{ width: "100%" }}>
              <div className="arrows col-7" onClick={scrollToPrevious4} >
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className="arrows col-7" onClick={scrollToNext4}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Shop;