import React from 'react';

const Offer = () => {
  return (
    <Details />
  );
};

function Details() {
  return (
    <div className="container mx-auto bg-white rounded-lg shadow-[0_40px_100px_rgba(0,0,0,0.4)] max-w-lg mt-6 p-10 transform rotate-0">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Inventory Detail</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <img 
          src="https://i.pinimg.com/564x/ca/43/a1/ca43a11d6672b910f1c19b2c537ba2da.jpg"
          alt="Product"
          className="w-56 h-56 object-cover mb-6 md:mb-0 md:mr-8 rounded-lg"
        />
        <div className="w-full">
          <div className="mb-3">
            <span className="font-semibold">Product code:</span> 123
          </div>
          <div className="mb-3">
            <span className="font-semibold">Price:</span> 1000$
          </div>
          <div className="mb-3">
            <span className="font-semibold">Category:</span> iPhone
          </div>
          <div className="mb-3">
            <span className="font-semibold">Inventory:</span> 100
          </div>
          <div className="mb-3">
            <span className="font-semibold">Subtotal:</span> 1000$
          </div>
          <div className="mb-3">
            <span className="font-semibold">Description:</span> Nigaaaaaaaa
          </div>
          <div className="mb-3">
            <span className="font-semibold">Total:</span> 900$
          </div>
          <button className="mt-6 bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Offer;

