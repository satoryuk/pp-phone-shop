const Order_By_ID = () => {
  return (
    <div>
      <Invoice />
    </div>
  );
};
import React from "react";

function Invoice() {
  return (
    <section className="w-[1500px] mt-44">
      <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
        {/* Header Section */}
        <h1 className="text-green-600 text-3xl font-bold mb-4">INVOICE</h1>
        <div className="flex justify-between mb-4 border-b pb-4">
          <div>
            <p className="text-gray-600">Full Name</p>
            <p className="text-black font-semibold">User</p>
          </div>
          <div>
            <p className="text-gray-600">Invoice ID</p>
            <p className="text-black font-semibold">123</p>
          </div>
          <div>
            <p className="text-gray-600">Date</p>
            <p className="text-black font-semibold">01-01-2000</p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="text-black font-semibold">Phnom Penh</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <div className="flex text-gray-500 font-semibold">
            <p className="flex-1">Product</p>
            <p className="w-20 text-center">Quantity</p>
            <p className="w-24 text-center">Unit Price</p>
            <p className="w-24 text-center">Amount</p>
          </div>
          {/* content in Table */}
          {fakeData.map((prod) => (
            <div className="flex items-center border-t py-4">
              <div className="flex-1 flex items-center">
                <img
                  src="https://i.pinimg.com/564x/ca/43/a1/ca43a11d6672b910f1c19b2c537ba2da.jpg"
                  alt="Product"
                  className="w-12 h-12 rounded mr-2"
                />
                <p>{prod.name}</p>
              </div>
              <p className="w-20 text-center">{prod.quantity}</p>
              <p className="w-24 text-center">{prod.unitPrice}</p>
              <p className="w-24 text-center">{prod.amount}</p>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="text-right">
          <div className="flex justify-end gap-4 mb-2">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-black font-semibold">1000$</p>
          </div>
          <div className="flex justify-end gap-4 mb-2">
            <p className="text-gray-500">Discount (10%)</p>
            <p className="text-black font-semibold">100$</p>
          </div>
          <div className="flex justify-end gap-4">
            <p className="text-gray-500 font-semibold">Total</p>
            <p className="text-black font-semibold">900$</p>
          </div>
        </div>

        {/* Export Button */}
        <XButton label="Export" />
      </div>
    </section>
  );
}

function XButton({ label }) {
  return (
    <div className="text-right mt-6">
      <button className="bg-green-600 text-white px-6 py-2 rounded font-semibold">
        {label}
      </button>
    </div>
  );
}

export default Order_By_ID;

class OrderProductModel {
  constructor(id, name, quantity = 1, unitPrice = 100) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.amount = this.unitPrice * this.quantity;
  }
}

const fakeData = [
  new OrderProductModel(1, "Iphone", 1, 1000),
  new OrderProductModel(2, "Samsung", 2, 1000),
  new OrderProductModel(3, "Xiami", 1, 250),
  new OrderProductModel(4, "FakePhone", 1, 1000),
  new OrderProductModel(5, "Oppo", 4, 1000),
];
