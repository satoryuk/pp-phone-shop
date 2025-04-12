import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { toggleStatusTab } from "../../store/cart";
import { cancel } from "../Assets/image";

const AddToCart = () => {
  const carts = useSelector((state) => state.cart.items);
  const statusTab = useSelector((state) => state.cart.statusTab);
  const dispatch = useDispatch();
  const cartRef = useRef(null);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        statusTab
      ) {
        handleCloseTabCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [statusTab]);

  return (
    <>
      {/* Backdrop */}
      {statusTab && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseTabCart}
        ></div>
      )}

      {/* Cart Panel */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 bg-white shadow-xl w-96 h-full flex flex-col z-50
        transform transition-transform duration-500
        ${statusTab ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white px-5 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            className="hover:scale-105 transition-transform"
            onClick={handleCloseTabCart}
          >
            <img src={cancel} alt="" className="w-7" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 px-5 py-2 overflow-y-auto">
          {carts.length > 0 ? (
            carts.map((item) => (
              <CartItem key={item.productId} product={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-600 text-center">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-blue-600 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-bold">Total:</span>
            <span className="text-xl font-bold text-white">
              $
              {carts
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>

          {/* btn close and checkout */}
          <div className="grid grid-cols-2 gap-2">
            <button
              className="bg-red-600 text-white py-2 font-bold rounded hover:bg-red-700 transition-colors"
              onClick={handleCloseTabCart}
            >
              Close
            </button>
            <Link
              className="bg-gray-700 text-white font-bold py-2 rounded flex justify-center items-center hover:bg-gray-800 transition-colors"
              to="/checkout"
              onClick={handleCloseTabCart}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
