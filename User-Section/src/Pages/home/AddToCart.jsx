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
    <div>
      <div className="flex p-8">
        <div className="w-2/3 pr-4">
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
          <Link to="/product-detail">
            <div className="flex items-center">
              <img src={back_sign} alt="back_sign" className="w-[25px]" />
              <a href="#" className="text-green-500 ml-2">
                Back to shopping
              </a>
            </div>
          </Link>
        </div>
        <div className="w-1/3 pl-4">
          <OrderSummary items={cartItems} shipping={5} total={total + 5} />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
