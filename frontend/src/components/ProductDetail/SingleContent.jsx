import React from "react";
import ProductGallery from "./Gallery/ProductGallery";
import ProductInfo from "./Info/ProductInfo";


const SingleContent = ({ product }) => {
  return (
    <div className="single-content">
      <main className="site-main">
        <ProductGallery product={product} />
        <ProductInfo product={product}/>
      </main>
    </div>
  );
};

export default SingleContent;
