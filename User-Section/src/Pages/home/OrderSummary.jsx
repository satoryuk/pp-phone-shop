import React, { useState } from "react";
import {
  desertColor,
  naturalColor,
  blackColor,
  silverColor,
} from "../Assets/image";
import CheckoutCart from "../../Conponents/CheckoutCart";
import { useSelector } from "react-redux";

const OrderSummary = ({ totalQuantity, totalPrice }) => {

  const cart = useSelector(store => store.cart.items);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mt-8">
        <p>Product Name</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      <div className=" border-t pt-4 py-4">
        {cart.map((element, index) => (
          <CheckoutCart items={element} />
        ))}
        <p className="flex justify-between py-2 mt-5">
          <span>Amount Quantity:</span> <span>{totalQuantity | 0}</span>
        </p>
        {/* <p className="flex justify-between py-2">
          <span>Tax:</span> <span>$0.00</span>
        </p> */}
        <hr className="my-4 border-gray-300" />
        <p className="flex justify-between font-semibold text-red-600 text-lg pt-2">
          <span>Total Payment:</span><span>{totalPrice}</span>
        </p>
      </div>

      <div>
        <div className="flex items-center py-4">
          {/* <div>
            <img
              src={naturalColor}
              alt="Natural Titanium"
              className="w-[150px] h-auto"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
