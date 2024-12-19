import React from "react";
import "./ProductGallery.css";

const ProductGallery = ({product}) => {
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        {/* Ana görsel */}
        <img
          src={`/${product?.img[0]}`}
          id="single-image"
          alt="Product main view"
        />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            {product?.img && product.img.length > 0 &&
              product.img.map((image, index) => (
                <li
                  key={index}
                  className={`glide__slide ${index === 0 ? "glide__slide--active" : ""}`}
                  style={{ width: "109px", marginRight: "5px" }}
                >
                  <img
                    src={`/${image}`} 
                    alt={`Product thumbnail ${index + 1}`}
                    className="img-fluid"
                  />
                </li>
              ))
            }
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
