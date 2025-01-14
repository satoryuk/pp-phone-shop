import { useEffect, useState, useCallback } from "react";
import { fetchBrand, fetchCategory, fetchSearchDataByName } from "../../FetchAPI/Fetch";
import ProductCard from "./ProductCard";
import Card from "./Card";

const Search = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const productName = params.get("productName");
  const [brand, setBrand] = useState([]);

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const handleFetchCategory = async () => {
    try {
      const response = await fetchCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetchSearchDataByName({ phone_name: productName });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [productName]);

  const handleFetchBrand = async () => {
    try {
      const response = await fetchBrand();
      setBrand(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (productName) {
      handleSearch();
    }
    handleFetchCategory();
    handleFetchBrand();
  }, [handleSearch, productName]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Explore Our Products
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Section */}
          <div className="grid gap-4 py-5 px-4 mb-4 rounded-lg shadow-md">
            <div>
              <h1 className="text-3xl font-extrabold mb-10 text-gray-900">Categories</h1>
              <div className="flex flex-col gap-10">
                {category.length > 0 ? (
                  category.map((element, index) => (
                    <Card data={element} page="Categories" />
                  ))

                ) : (
                  <p>No categories available.</p>
                )}
              </div>
            </div>
          </div>

          {console.log(category)
          }
          {/* Products Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Results for "{productName || "All Products"}"
            </h2>
            {data.length === 0 ? (
              <p className="text-gray-500">No products found for "{productName}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((element) => (
                  <ProductCard key={element.id} product={element} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Brands Section */}
        <div>
          <div>
            <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Brands</h1>
          </div>
          <div className="flex flex-wrap gap-4 py-5 px-4 items-center mb-4 rounded-lg shadow-md">

            {brand.map((element, index) => (
              <Card data={element} page="Brands" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
