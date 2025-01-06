import React, { useEffect, useState } from "react";
import { fetchCategory } from "../../FetchAPI/Fetch";
import { Link } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState([]);

  const handleFetchCategory = async () => {
    try {
      const response = await fetchCategory();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, []);

  return (
    <div className="bg-white w-full shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Categories</h1>
      {data.length > 0 ? (
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
                {element.category_name}
              </h2>

              {/* View More Link */}
              <Link
                to={`category?category=${element.category_name}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                View more &rarr;
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default Card;
