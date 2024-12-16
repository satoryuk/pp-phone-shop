import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useState } from "react";
import {
  desertColor,
  blackColor,
  silverColor,
  naturalColor,
} from "../Assets/image";
import Card from "./Card";

const products = [
  { id: 1, name: "Item Name", price: 1000, image: silverColor },
  { id: 2, name: "Item Name", price: 1000, image: desertColor },
  { id: 3, name: "Item Name", price: 1000, image: blackColor },
  { id: 4, name: "Item Name", price: 1000, image: naturalColor },
  { id: 5, name: "Item Name", price: 1000, image: silverColor },
  { id: 6, name: "Item Name", price: 1000, image: desertColor },
  { id: 7, name: "Item Name", price: 1000, image: blackColor },
  { id: 8, name: "Item Name", price: 1000, image: naturalColor },
  // Add more products here
];

const HomePage = () => {
  return (
    <div>
      <div></div>
      <div className="px-8 py-4">
        {/* Special Offer Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold">SPECIAL OFFER</h2>
            <a href="#" className="text-blue-500">
              VIEW ALL
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* New Arrival Section */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold">NEW ARRIVAL</h2>
            <a href="#" className="text-blue-500">
              VIEW ALL
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* New Arrival Section */}
        <div className="mb-8">
          <h2 className="text-[20px] font-bold">NEW ARRIVAL</h2>
          <div className="flex justify-between my-4 bg-gray-100 p-4 rounded-lg">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        {/* Accesories Section */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold">SPECIAL OFFER</h2>
            <a href="#" className="text-blue-500">
              VIEW ALL
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
