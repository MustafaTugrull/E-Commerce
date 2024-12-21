import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartProvider";

const CartTable = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.map((product) => {
          const unitPrice = product.price * (1 - product.discount);
          return (
            <tr className="cart-item">
              <td></td>
              <td className="cart-image">
                <img src={product.img[0]} alt="" />
                <i
                  className="bi bi-x delete-cart"
                  onClick={() => removeFromCart(product._id)}
                ></i>
              </td>
              <td>
                <a href={`productDetail/${product._id}`}>{product.name}</a>
              </td>
              <td>${unitPrice.toFixed(2)}</td>
              <td className="product-quantity">1</td>
              <td className="product-subtotal">
                ${(unitPrice * 1).toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CartTable;
