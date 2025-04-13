import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart, toggleStatusTab } from "../../store/cart";
import { removeFromFavorite } from "../../store/favorite";
import { cancel } from "../Assets/image";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.phone_id,
        quantity: 1,
        price: product.price, // Assuming you're adding one item at a time
      })
    );
    dispatch(toggleStatusTab());
  };

  // Handle removing the product from favorites
  const handleRemove = () => {
    dispatch(removeFromFavorite({ productId: product.phone_id }));
  };

  // Generate the product image URL
  const imageUrl = `http://localhost:3000/${(product.images || "")
    .trim()
    .replace(/uploads[\\/]/g, "")
    .replace(/\s+/g, "")}`;

  return (
    <div className="relative bg-white shadow-md rounded-lg py-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-4">
      <Link to={`/product-detail?phone_name=${product.name}`}>
        <div className="w-auto h-[150px] flex justify-center items-center  rounded-md overflow-hidden mt-1">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <h3 className="mt-4 text-center text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <div className="flex justify-center items-center gap-2 mt-2">
          {product.price_discount ? (
            <>
              <s className="text-gray-500 text-sm font-mediu">
                ${product.price}
              </s>
              <p className="text-red-600 text-xl font-bold">
                ${product.price_discount}
              </p>
            </>
          ) : (
            <p className="text-red-600 text-xl font-bold">${product.price}</p>
          )}
        </div>
      </Link>

      <div className="w-full flex justify-center mt-4">
        {location.pathname === "/Add-to-favorite" && (
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-all duration-200"
          >
            <img src={cancel} alt="cancel" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
