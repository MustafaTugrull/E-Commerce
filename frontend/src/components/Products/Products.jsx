import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductItem from "./ProductItem";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Ürünler getirilirken bir sorun meydana geldi...");
        }
      } catch (error) {
        console.log("Sunucu hatası...");
      }
    };
    getProducts();
  }, [setProducts]);

  return (
    <div>
        <section className="products">
    <div className="container">
      <div className="section-title">
        <h2>Featured Products</h2>
        <p>Summer Collection New Morden Design</p>
      </div>
      <div className="product-wrapper product-carousel">
        <div className="glide__track">
          <ul className="product-list glide__slides" id="product-list">
          {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
            
          </ul>
        </div>
        <div className="glide__arrows">
          <button className="glide__arrow glide__arrow--left">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="glide__arrow glide__arrow--right">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
};

export default Products;
