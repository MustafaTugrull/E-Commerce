import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartProvider";

const CartTotals = () => {
  const { cartItems, calculatePrice, couponDiscount, setCouponDiscount } =
    useContext(CartContext);
  const [fastCargo, setFastCargo] = useState(false);

  const totalPrice = cartItems.reduce((total, product) => {
    const unitPrice = calculatePrice(product);
    return total + unitPrice * product.quantity;
  }, 0);

  let result = totalPrice * (1 - couponDiscount / 100);

  const cargoPrice = 15.0;

  useEffect(() => {
    setCouponDiscount(0);
  }, window.location.pathname);

  const generalTotals = fastCargo
    ? (result + cargoPrice).toFixed(2)
    : result.toFixed(2);
  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${result.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargo}
                      onChange={() => setFastCargo(!fastCargo)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${generalTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
