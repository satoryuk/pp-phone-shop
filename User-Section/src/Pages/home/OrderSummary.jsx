import React from "react";
import {
  desertColor,
  naturalColor,
  blackColor,
  silverColor,
} from "../Assets/image";

const OrderSummary = () => {
  const items = [
    {
      name: "IPHONE 16 PRO MAX",
      storage: "512 GB",
      color: "Natural Titanium",
      price: 1599,
      quantity: 2,
      image: { desertColor },
    },
    {
      name: "IPHONE 16 PRO MAX",
      storage: "512 GB",
      color: "Natural Titanium",
      price: 1599,
      quantity: 3,
      image: { naturalColor },
    },
    // Add more items as needed
  ];

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="mt-4 border-t pt-4 py-4">
        <p className="flex justify-between py-2">
          <span>Items:</span> <span>{items.length}</span>
        </p>
        <p className="flex justify-between py-2">
          <span>Delivery:</span> <span>$5.00</span>
        </p>
        <p className="flex justify-between py-2">
          <span>Discount:</span> <span className="text-red-600">-$0.00</span>
        </p>
        <p className="flex justify-between py-2">
          <span>Tax:</span> <span>$0.00</span>
        </p>
        <p className="flex justify-between font-semibold text-red-600 text-lg pt-2">
          <span>Total Payment:</span> <span>${totalAmount + 5}</span>
        </p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        <div className="flex items-center py-4">
          {/* <div>
            <img
              src={naturalColor}
              alt="Natural Titanium"
              className="w-[150px] h-auto"
            />
          </div> */}
          <div className="ml-10">
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <p className="py-2">Storage: {item.storage}</p>
                    <p className="py-2">Color: {item.color}</p>
                    <p className="py-2">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-red-600">
                    Total: ${item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
