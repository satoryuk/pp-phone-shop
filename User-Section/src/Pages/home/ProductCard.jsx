import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate("/product-detail", { state: { product } });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:p-2 hover:shadow-lg transition-all duration-300"
      onClick={handleProductClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-cover rounded-md"
      />
      <h3 className="mt-2 text-center font-semibold text-gray-800">
        {product.name}
      </h3>
      <p className="text-center text-green-600 font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
