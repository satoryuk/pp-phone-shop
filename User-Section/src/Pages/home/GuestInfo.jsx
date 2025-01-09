import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllCart } from "../../store/cart";
import { Link } from "react-router-dom";

const GuestInfo = () => {

  const dispatch = useDispatch();
  const pay = () => {
    dispatch(
      removeAllCart()
    )
  }
  return (

    <div>
      <h3 className="text-xl font-semibold mb-4">DELIVERY INFORAMATON</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <h4 className="pb-2">Delivery Express</h4>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Select Delivery Type</option>
            <option>DELEVERY</option>
            <option>PICKUP</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="pb-2">PAY METHOD</h4>
          <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Select Delivery Type</option>
            <option>BY DELEVERY</option>
            <option>CREDIT CARD</option>
          </select>
        </div>
        <div className="flex flex-col w-full col-span-2">
          <h4 className="pb-2">LOCATION</h4>
          <input
            type="text"
            placeholder="Village"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center justify-center pt-6 col-span-2">
          <button
            onClick={(e) => pay(e)}
            className="w-[300px] p-2 bg-green-400 hover:bg-green-500 text-white rounded transition-all duration-300">
            Pay Now
          </button>
        </div>
      </form>
    </div>



  );
};

export default GuestInfo;
