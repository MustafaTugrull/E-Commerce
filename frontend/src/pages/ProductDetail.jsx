import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SingleProductDetail from '../components/ProductDetail/SingleProductDetail'
import { message } from 'antd';

const ProductDetail = () => {
  const params = useParams();  
  const id = params.id;
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
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

    getProduct();
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <SingleProductDetail singleProduct={singleProduct}/>
  )
}

export default ProductDetail