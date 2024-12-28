import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartProvider";
import { message } from "antd";

const CartCoupon = () => {
  const { couponCode, setCouponCode, setCouponDiscount } =
    useContext(CartContext);

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Kupon kodu değeri boş girilemez...");
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponCode}`
      );

      if (!response.ok) {
        return message.warning("Geçersiz kupon kodu...");
      }

      const data = await response.json();

      if (new Date(data.expired) < Date.now()) {
        return message.warning("Girdiğiniz kupon kodunun süresi dolmuştur.");
      }

      if (!data.count > 0) {
        return message.warning(
          "Girdiğiniz kupon kodu maksimum kullanım sayısına ulaşmıştır."
        );
      }

      await fetch(`http://localhost:5000/api/coupons/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          count: data.count - 1,
        }),
      });

      // const updatedCart = cartItems.map((item) => {
      //   const updatedUnitPrice = item.price * (1 - data.discount / 100);
      //   return {
      //     ...item,
      //     price: updatedUnitPrice,
      //   };
      // });
      setCouponDiscount(data.discount);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
