import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart, toggleStatusTab } from "../../store/cart";
import { removeFromFavorite } from "../../store/favorite";
import { favorite_packages } from "../Assets/image";

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
    .replace(/\s+/g, "")
    }`;

  return (
    <div className="relative justify-center flex flex-col items-center bg-white shadow-md rounded-lg p-4 cursor-pointer hover:p-2 hover:shadow-lg transition-all duration-300">
      <Link to={`/product-detail?phone_name=${product.name}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-52 h-64 object-contain rounded-md"
        />
        <h3 className="mt-2 text-center font-semibold text-gray-800">
          {product.name}
        </h3>
        {/* Wrap price details in a flex container */}
        <div className="flex justify-center items-center gap-2">
          {product.price_discount && (
            <s className="text-gray-500 font-bold text-sm">
              ${product.price_discount}
            </s>
          )}
          <p className="text-green-600 font-bold text-lg">${product.price}</p>
        </div>
      </Link>
      <div className="w-full flex flex-col items-center">
        {/* <button
          className="mt-4 w-52 py-2 mb-3 bg-white text-black flex justify-center items-center gap-2 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-200"
          onClick={() => handleAddToCart(product)} // No need to pass product again
        >
          Add To Cart
          <img src={favorite_packages} alt="Add to Cart" className="w-5" />
        </button> */}
        {location.pathname === "/Add-to-favorite" && (
          <button
            className="absolute top-0 right-3 font-bold text-red-500"
            onClick={handleRemove}
          >
            X
          </button>
        )}
      </div>

    </div>
  );
};

export default ProductCard;
