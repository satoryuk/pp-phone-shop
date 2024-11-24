import React from 'react';

const Offer = () => {
  return (
    <Details />
  );
}

function Details() {
  return (
    <div className="container mx-auto bg-gray-100 rounded-lg shadow-[0_100px_50px_rgba(0,0,0,0.3)] max-w-md mt-12 p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Inventory Detail</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <img 
          src="https://pin.it/516G85ZIt" // Replace with your image URL
          alt="Product"
          className="w-48 h-48 object-cover mb-4 md:mb-0 md:mr-6 rounded-lg"
        />
        <div className="w-full">
          <div className="mb-2">
            <span className="font-semibold">Product code:</span> 123
          </div>
          <div className="mb-2">
            <span className="font-semibold">Price:</span> 1000$
          </div>
          <div className="mb-2">
            <span className="font-semibold">Category:</span> iPhone
          </div>
          <div className="mb-2">
            <span className="font-semibold">Inventory:</span> 100
          </div>
          <div className="mb-2">
            <span className="font-semibold">Subtotal:</span> 1000$
          </div>
          <div className="mb-2">
            <span className="font-semibold">Description:</span> Nigaaaaaaaa
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total:</span> 900$
          </div>
          <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Offer;
