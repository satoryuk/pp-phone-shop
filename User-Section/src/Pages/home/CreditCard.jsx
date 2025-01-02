import React from "react";
import { creditCard } from "../Assets/image";

const CreditCard = () => {
  return (
    <div>
      <div className="flex items-center gap-12">
        <h3 className="text-xl font-semibold mb-4">CREDIT CARD</h3>
        <img
          src={creditCard}
          alt="credir-card-image"
          className="w-[200px] h-auto] mb-3"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">PAYMENT</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <h4 className="pb-2">Card Number</h4>
          <input
            type="text"
            placeholder="Card Number"
            className="input-field"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Card Name</h4>
          <input type="text" placeholder="Card Name" className="input-field" />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Expiry Date</h4>
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="input-field"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Security Code</h4>
          <input
            type="text"
            placeholder="Security Code"
            className="input-field"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">ZIP / Postal Code</h4>
          <input
            type="text"
            placeholder="ZIP / Postal Code"
            className="input-field"
          />
        </div>
      </form>
      <div className="flex items-center justify-center pt-6">
        <button className="w-[300px] p-2 bg-green-400 hover:bg-green-500 text-white rounded transition-all duration-300">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CreditCard;
