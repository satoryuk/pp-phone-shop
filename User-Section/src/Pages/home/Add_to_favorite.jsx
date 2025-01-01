import React, { useState } from "react";
import {
  blackColor,
  desertColor,
  naturalColor,
  silverColor,
} from "../Assets/image";
import { Link } from "react-router-dom";
import { back_sign } from "../Assets/image";

const Add_to_favorite = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: "iPhone 16 Pro Max", price: 1199.0, image: silverColor },
    { id: 2, name: "iPhone 16 Pro", price: 1199.0, image: blackColor },
    { id: 3, name: "iPhone 15 Pro Max", price: 1199.0, image: silverColor },
    { id: 4, name: "iPhone 16", price: 1199.0, image: blackColor },
    { id: 5, name: "iPhone 11 Pro Max", price: 435.0, image: blackColor },
    { id: 6, name: "iPhone 12 Pro Max", price: 1199.0, image: silverColor },
  ]);

  // Function to remove a favorite
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden group relative hover:bg-gray-50 transition"
          >
            {/* Image */}
            <div className="relative w-full h-40 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover"
              />
            </div>

            {/* Details Section (Visible by default) */}
            <div className="p-4 text-center bg-gray-50">
              <h2 className="text-lg font-bold">{item.name}</h2>
              {/* Hide Price and Monthly Cost on Hover */}
              <div className="group-hover:hidden">
                <p className="text-red-500 text-sm font-semibold mb-2">
                  Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                  Or{" "}
                  <span className="text-red-500">
                    ${(item.price / 12).toFixed(2)}
                  </span>
                  /month for <span className="text-red-500">12</span> months
                </p>
              </div>
            </div>

            {/* Hover Button */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity ">
              <button
                onClick={() => removeFavorite(item.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Remove Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <div className="flex items-center mt-4">
          <img src={back_sign} alt="back_sign" className="w-[25px]" />
          <a href="#" className="text-green-500 ml-2">
            Back to Home
          </a>
        </div>
      </Link>
    </div>
  );
};

export default Add_to_favorite;
