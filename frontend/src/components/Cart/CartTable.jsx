import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartProvider";

const CartTable = () => {
  const { cartItems, removeFromCart, calculatePrice, updateQuantity } = useContext(CartContext);

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
          const unitPrice = calculatePrice(product);
          const subtotal = unitPrice * product.quantity;

          return (
            <tr className="cart-item" key={product._id}>
              <td></td>
              <td className="cart-image">
                <img src={product.img[0]} alt={product.name} />
                <i
                  className="bi bi-x delete-cart"
                  onClick={() => removeFromCart(product._id)}
                ></i>
              </td>
              <td>
                <a href={`productDetail/${product._id}`}>{product.name}</a>
              </td>
              <td>${unitPrice.toFixed(2)}</td>
              <td className="product-quantity">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  max="10"
                  onChange={(e) =>
                    updateQuantity(product._id, parseInt(e.target.value) || 1)
                  }
                />
              </td>
              <td className="product-subtotal">
                ${subtotal.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CartTable;
