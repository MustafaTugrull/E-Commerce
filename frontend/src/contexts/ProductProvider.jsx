import React, { createContext, useEffect, useState } from "react";
import { message } from "antd";

export const ProductContext = createContext();

const ProductProvider = ({ productId,children }) => {
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (response.ok) {
          const productData = await response.json();
          setSingleProduct(productData);
        } else {
          message.error("Ürün detayı alınamadı.");
        }
      } catch (error) {
        message.error("Sunucu hatası...");
      }
    };

    if (productId) {
      getProduct();
    }

    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <ProductContext.Provider value={{ singleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
