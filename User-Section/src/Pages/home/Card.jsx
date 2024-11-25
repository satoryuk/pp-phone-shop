// Home card for new arrival
import React from "react";

const Card = () => {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4">
      {/* Icon */}
      <div className="text-4xl">
        <i className="fas fa-mobile-alt"></i>
      </div>

      {/* Divider */}
      <div className="h-12 border-l border-gray-300"></div>

      {/* Text Content */}
      <div>
        <h2 className="text-lg font-semibold">Mobile Phone</h2>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
          view more &rarr;
        </a>
      </div>
    </div>
  );
};

export default Card;
