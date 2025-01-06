import { useEffect, useState, useCallback } from "react";
import { fetchSearchDataByName } from "../../FetchAPI/Fetch";
import ProductCard from "./ProductCard";

const After_home_page = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const productName = params.get("productName");

  const [data, setData] = useState([]);

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetchSearchDataByName({ phone_name: productName });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [productName]);

  useEffect(() => {
    if (productName) {
      handleSearch();
    }
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
          <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Categories</h2>
            <div className="space-y-6">
              {[
                { name: "iPhone", type: "iOS System", image: "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg" },
                { name: "Samsung", type: "Android", image: "https://i.pinimg.com/474x/05/0a/c9/050ac92cb432973286bbba0b3637f17c.jpg" },
                { name: "Redmi", type: "Android", image: "https://i.pinimg.com/736x/1d/75/3d/1d753d36738603483265513eb070a106.jpg" },
                { name: "Vivo", type: "Android", image: "https://i.pinimg.com/474x/d1/e1/d1/d1e1d1bd9a4c19311611a08fb907547b.jpg" },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg cursor-pointer shadow-md"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{category.name}</p>
                    <p className="text-gray-500 text-sm">{category.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
        <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Popular Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Redmi", image: "https://i.pinimg.com/736x/1d/75/3d/1d753d36738603483265513eb070a106.jpg" },
              { name: "Vivo", image: "https://i.pinimg.com/474x/d1/e1/d1/d1e1d1bd9a4c19311611a08fb907547b.jpg" },
              { name: "Apple", image: "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg" },
              { name: "Huawei", image: "https://i.pinimg.com/736x/22/b4/6c/22b46c6e80b2f5c1f6178e08223cc726.jpg" },
              { name: "Oppo", image: "https://i.pinimg.com/736x/eb/e5/42/ebe542236f9dc911005c816d004930eb.jpg" },
              { name: "Samsung", image: "https://i.pinimg.com/474x/05/0a/c9/050ac92cb432973286bbba0b3637f17c.jpg" },
            ].map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow-md"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 object-cover mb-2 rounded-full"
                />
                <p className="text-sm font-medium text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default After_home_page;
