import React, { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../../contexts/CartProvider";

const CartTotals = () => {
  const { cartItems, calculatePrice, couponDiscount, setCouponDiscount } =
    useContext(CartContext);
  const [fastCargo, setFastCargo] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const totalPrice = cartItems.reduce((total, product) => {
    const unitPrice = calculatePrice(product);
    return total + unitPrice * product.quantity;
  }, 0);

  const PUBLIC_KEY =
    "pk_test_51QbHcAIvxxAMaxnlmZom5LA83F1vMOroJgXwlRlIvp82BvrMwQEd7VJwxyLS1IGznkVqAOzGHfE0GUXtBAbATqqN0030RtRKbn";

  const handlePayment = async () => {
    if (!user) {
      return message.info(
        "Ödeme işlemleri için giriş yapmanız gerekmektedir..."
      );
    }

    const body = {
      products: cartItems,
      totalPrice: result,
      user: user,
      cargoFee: fastCargo ? cargoPrice : 0,
    };

    try {
      const stripe = await loadStripe(PUBLIC_KEY);

      const response = await fetch(`http://localhost:5000/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        return message.error("Ödeme işlemi başarışız.");
      }

      const data = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <button className="btn btn-lg" type="button" onClick={handlePayment}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
