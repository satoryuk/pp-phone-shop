import React from "react";
import GuestInfo from "./GuestInfo";
import CreditCard from "./CreditCard";
import OrderSummary from "./OrderSummary";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center p-8 bg-gray-100 min-h-screen">
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
  );
};

export default CheckoutPage;
