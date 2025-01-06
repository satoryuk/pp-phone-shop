import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { toggleStatusTab } from '../../store/cart';
import store from '../../store/store';

const AddToCart = () => {
  const carts = useSelector(store => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-white shadow-xl w-96 h-full flex flex-col
      transform transition-transform duration-500
      ${statusTab === false ? "translate-x-full" : "translate-x-0"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-green-600 text-white px-5 py-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button
          className="text-lg bg-white text-green-600 font-bold px-3 py-1 rounded hover:text-white hover:bg-gray-800 transition-colors"
          onClick={handleCloseTabCart}
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-5 overflow-y-auto">
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
      <div className="bg-green-600 p-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white">Total:</span>
          <span className="text-xl font-bold text-white">
            ${carts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
        <div className="grid  grid-cols-2 gap-2">
          <button
            className="bg-gray-800 text-white py-2 font-bold rounded hover:bg-gray-700 transition-colors"
            onClick={handleCloseTabCart}
          >
            Close
          </button>
          <Link
            className="bg-white text-green-600 font-bold py-2 rounded flex justify-center items-center hover:bg-green-500 transition-colors"
            to="/checkout"
            onClick={handleCloseTabCart}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
