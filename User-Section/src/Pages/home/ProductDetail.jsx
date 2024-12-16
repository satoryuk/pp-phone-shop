import React, { useState } from "react";
import {
  desertColor,
  blackColor,
  silverColor,
  naturalColor,
  call_green,
  telegram_green,
  buy_green,
  messenger_green,
  favorite_green,
} from "../Assets/image";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const [selectedStorage, setSelectedStorage] = useState("256 GB");
  const [selectedColor, setSelectedColor] = useState("Black Titanium");
  const [mainImage, setMainImage] = useState(desertColor);

  const handleThumbnaiClick = (image) => {
    setMainImage(image);
  };

  const priceData = {
    "256 GB": {
      "Black Titanium": 1199,
      "Silver Titanium": 1249,
      "Natural Titanium": 1299,
      "Desert Titanium": 1349,
    },
    " GB512": {
      "Black Titanium": 1399,
      "Silver Titanium": 1449,
      "Black Titanium": 1499,
      "Desert Titanium": 1549,
    },
    "1 T": {
      "Black Titanium": 1599,
      "Silver Titanium": 1649,
      "Natural Titanium": 1699,
      "Desert Titanium": 1749,
    },
  };

  const getPrice = () => {
    return priceData[selectedStorage][selectedColor];
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4">
        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Product Images */}
          <div className="flex flex-col items-center">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-auto mb-4"
            />
            <div className="flex mt-4 space-x-4">
              <img
                src={silverColor}
                alt="Thumbnail 1"
                className="w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => handleThumbnaiClick(silverColor)}
              />
              <img
                src={naturalColor}
                alt="Thumbnail 2"
                className="w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => handleThumbnaiClick(naturalColor)}
              />
              <img
                src={blackColor}
                alt="Thumbnail 3"
                className="w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => handleThumbnaiClick(blackColor)}
              />
              <img
                src={desertColor}
                alt="Thumbnail 3"
                className="w-20 h-20 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => handleThumbnaiClick(desertColor)}
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Product Name */}
            <h2 className="text-3xl font-semibold">IPhone 16 Pro Max</h2>
            <div className="flex items-center gap-4 my-5">
              <p className="text-2xl text-red-600 font-bold">
                Price: ${getPrice().toFixed(2)}
              </p>
              <span className="h-6 border-l border-gray-400"></span>
              <p className="text-gray-600">Warranty for two years</p>
            </div>

            {/* Storage Options */}
            <div className="mb-4">
              <h3 className="font-semibold">Storage</h3>
              <div className="flex space-x-4 mt-2">
                {["256 GB", "512 GB", "1 TB"].map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 border rounded ${
                      selectedStorage === storage
                        ? "bg-green-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div className="mb-4">
              <h3 className="font-semibold">Color</h3>
              <div className="flex space-x-4 mt-2">
                {[
                  "Black Titanium",
                  "Silver Titanium",
                  "Natural Titanium",
                  "Desert Titanium",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === color
                        ? "bg-green-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex justify-center items-center">
                <img src={telegram_green} alt="" className="w-5 mr-1" />
                <a
                  href="https://t.me/yourtelegramusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-inherit hover:text-green-600"
                >
                  Contact to Telegram chat
                </a>
              </div>

              <div className="flex justify-center items-center">
                <img src={messenger_green} alt="" className="w-5 mr-1" />
                <a
                  href="https://m.me/yourmessengerusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-inherit hover:text-green-600"
                >
                  Contact to Messenger chat
                </a>
              </div>

              <div className="flex justify-center items-center">
                <img src={call_green} alt="" className="w-5 mr-1" />
                <a
                  href="tel:+1234567890"
                  className="text-inherit hover:text-green-600"
                >
                  Contact to Phone call
                </a>
              </div>

              <div className="flex justify-center items-center">
                <img src={buy_green} alt="" className="w-5 mr-1" />
                <a href="/cart" className="text-inherit hover:text-green-600">
                  Or add to cart for Order
                </a>
              </div>
            </div>

            {/* Add to cart and Fav */}
            <div className="flex gap-4 mt-4 space-y-2">
              <button className="w-[300px] p-2 bg-green-400 hover:bg-green-500 text-white rounded transition-all duration-300">
                Add To Cart
              </button>
              <div className="flex">
                <img src={favorite_green} alt="" className="w-5 mr-1" />
                <button className="hover:text-green-500">
                  Add to Favorite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Specifications</h3>
          <div className="mt-4 hover:cursor-pointer">
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Display</summary>
              <div className="py-4">
                <p className="pt-2 pl-14">
                  Type : LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision,
                  1000 nits (typ), 2000 nits (HBM)
                </p>
                <p className="pt-2 pl-14">
                  Size : 6.9 inches, 115.6 cm2 (~91.4% screen-to-body ratio)
                </p>
                <p className="pt-2 pl-14">
                  Resolution : 1320 x 2868 pixels, 19.5:9 ratio (~460 ppi
                  density)
                </p>
                <p className="pt-2 pl-14">
                  Protection : Ceramic Shield glass (2024 gen), Always-On
                  display
                </p>
              </div>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Body</summary>
              <div className="py-4">
                <p className="pt-2 pl-14">
                  Type : LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision,
                  1000 nits (typ), 2000 nits (HBM)
                </p>
                <p className="pt-2 pl-14">
                  Size : 6.9 inches, 115.6 cm2 (~91.4% screen-to-body ratio)
                </p>
                <p className="pt-2 pl-14">
                  Resolution : 1320 x 2868 pixels, 19.5:9 ratio (~460 ppi
                  density)
                </p>
                <p className="pt-2 pl-14">
                  Protection : Ceramic Shield glass (2024 gen), Always-On
                  display
                </p>
              </div>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Camera</summary>
              <div className="py-4">
                <p className="pt-2 pl-14">
                  Type : LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision,
                  1000 nits (typ), 2000 nits (HBM)
                </p>
                <p className="pt-2 pl-14">
                  Size : 6.9 inches, 115.6 cm2 (~91.4% screen-to-body ratio)
                </p>
                <p className="pt-2 pl-14">
                  Resolution : 1320 x 2868 pixels, 19.5:9 ratio (~460 ppi
                  density)
                </p>
                <p className="pt-2 pl-14">
                  Protection : Ceramic Shield glass (2024 gen), Always-On
                  display
                </p>
              </div>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Sound</summary>
              <div className="py-4">
                <p className="pt-2 pl-14">
                  Type : LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision,
                  1000 nits (typ), 2000 nits (HBM)
                </p>
                <p className="pt-2 pl-14">
                  Size : 6.9 inches, 115.6 cm2 (~91.4% screen-to-body ratio)
                </p>
                <p className="pt-2 pl-14">
                  Resolution : 1320 x 2868 pixels, 19.5:9 ratio (~460 ppi
                  density)
                </p>
                <p className="pt-2 pl-14">
                  Protection : Ceramic Shield glass (2024 gen), Always-On
                  display
                </p>
              </div>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Platform</summary>
              <p>6.7-inch Super Retina XDR display</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Memory</summary>
              <p>Aluminum and ceramic glass construction</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">launch</summary>
              <p>48MP main camera with advanced features</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Network</summary>
              <p>Stereo speakers with spatial audio support</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Comms</summary>
              <p>Aluminum and ceramic glass construction</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Features</summary>
              <p>48MP main camera with advanced features</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">Battery</summary>
              <p>Stereo speakers with spatial audio support</p>
            </details>
            <details className="border rounded mb-2 p-2">
              <summary className="font-semibold">MISC</summary>
              <p>Stereo speakers with spatial audio support</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
