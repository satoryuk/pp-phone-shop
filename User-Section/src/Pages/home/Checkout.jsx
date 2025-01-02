import React from "react";
import GuestInfo from "./GuestInfo";
import CreditCard from "./CreditCard";
import OrderSummary from "./OrderSummary";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="flex-col bg-gray-100 pt-2">
      {/* Links */}
      <div className="flex justify-center space-x-32 py-3 text-gray-500">
        <Link to="/add-to-cart">
          <span className="hover:text-green-600 hover:underline">Cart</span>
        </Link>
        <a href="#" className="hover:text-green-600 hover:underline">
          Shopping
        </a>
        <a href="#" className="hover:text-green-600 hover:underline">
          Payment
        </a>
        <a href="#" className="hover:text-green-600 hover:underline">
          Order Review
        </a>
      </div>
      <div className="flex flex-col lg:flex-row justify-center px-8 pb-8 bg-gray-100 min-h-screen">
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Guest Checkout</h2>
          <hr className="my-4 border-gray-300" />
          <div className="space-y-8">
            <GuestInfo />
            <CreditCard />
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-6 bg-white p-6 rounded-lg shadow-md">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
