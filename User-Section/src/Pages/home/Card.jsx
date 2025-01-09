import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, page }) => {
  return (
    <div className="bg-white w-full shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">{page}</h1>
      {data.length > 0 ? (
        page === "Categories" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((element, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="text-5xl text-blue-500 mb-4">
                  <i className="fas fa-mobile-alt"></i>
                </div>

                {/* Category Name */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {element.category_name || element.brand_name}
                </h2>

                {/* View More Link */}
                <Link
                  to={`Sort?category=${element.category_name}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View more &rarr;
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {data.map((element) => (
              <Link to={`Sort?brand=${element.brand_name}`}>
                <div
                  key={element.brand_name}
                  className="flex items-center gap-4 p-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg cursor-pointer shadow-md"
                >
                  <img
                    src={`http://localhost:3000/${element.img
                      ?.split(',')[0]
                      .trim()
                      .replace(/uploads[\\/]/g, '')
                      .replace(/\s+/g, '')}`}
                    alt={element.brand_name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {element.brand_name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default Card;
