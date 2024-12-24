import React from "react";
import { useParams } from "react-router-dom";
import SingleProductDetail from "../components/ProductDetail/SingleProductDetail";
import ProductProvider from "../contexts/ProductProvider";

const ProductDetail = () => {
  const { id: productId } = useParams(); 
  return (
    <ProductProvider productId={productId}>
      <SingleProductDetail />
    </ProductProvider>
  );
};

export default ProductDetail;
