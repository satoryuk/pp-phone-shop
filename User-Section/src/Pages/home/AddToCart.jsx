import React, { useState } from "react";
import CartItem from "./Cart_item";
import OrderSummary from "./Order_cart_summary";
import { back_sign } from "../Assets/image";
import { Link } from "react-router-dom";
import {
  blackColor,
  desertColor,
  naturalColor,
  silverColor,
} from "../Assets/image";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Name Product",
      price: 1000,
      quantity: 1,
      image: desertColor,
    },
    {
      id: 2,
      name: "Name Product",
      price: 1000,
      quantity: 2,
      image: silverColor,
    },
    {
      id: 3,
      name: "Name Product",
      price: 1000,
      quantity: 1,
      image: blackColor,
    },
    {
      id: 4,
      name: "Name Product",
      price: 1000,
      quantity: 2,
      image: silverColor,
    },
    {
      id: 5,
      name: "Name Product",
      price: 1000,
      quantity: 1,
      image: naturalColor,
    },
  ]);

  const handleAddQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row lg:p-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3 lg:pr-4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-semibold mb-6">Phone Shop Cart</h1>
          <div className="border-b-2 mb-4 pb-2 font-semibold flex justify-between">
            <span>Product Details</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onAdd={() => handleAddQuantity(item.id)}
              onRemove={() => handleRemoveQuantity(item.id)}
            />
          ))}

          {/* Back to Shopping Link - Visible only on large screens */}
          <Link to="/product-detail" className="hidden lg:block mt-4">
            <div className="flex items-center">
              <img src={back_sign} alt="back_sign" className="w-[25px]" />
              <span className="text-green-500 ml-2">Back to shopping</span>
            </div>
          </Link>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3 lg:pl-4">
          <OrderSummary items={cartItems} shipping={5} total={total + 5} />

          {/* Back to Shopping Link - Visible only on small screens */}
          <Link to="/product-detail" className="block lg:hidden mt-4">
            <div className="flex items-center">
              <img src={back_sign} alt="back_sign" className="w-[25px]" />
              <span className="text-green-500 ml-2">Back to shopping</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
