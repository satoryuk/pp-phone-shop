import React from "react";

const GuestInfo = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">GUEST IMFORMATION</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <h4 className="pb-2">Email Address</h4>
          <input
            type="email"
            placeholder="Email Address"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">First Name</h4>
          <input
            type="text"
            placeholder="First Name"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Last Name</h4>
          <input
            type="text"
            placeholder="Last Name"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="pb-2">Delivery Express</h4>
          <select className="input-field w-full">
            <option>Select Delivery Type</option>
            <option>Standard</option>
            <option>Express</option>
          </select>
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Village</h4>
          <input
            type="text"
            placeholder="Village"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Commune</h4>
          <input
            type="text"
            placeholder="Commune"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">District</h4>
          <input
            type="text"
            placeholder="District"
            className="input-field w-full"
          />
        </div>
        <div className="col-span-1">
          <h4 className="pb-2">Province</h4>
          <input
            type="text"
            placeholder="Province"
            className="input-field w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;
