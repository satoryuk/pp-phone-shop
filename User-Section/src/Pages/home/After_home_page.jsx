const After_home_page = () => {
  return (
    <div className="p-6 bg-gray-100">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Section (Left Side) */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="space-y-6">
            {[
              { name: "iPhone", type: "iOS System", image: "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg" },
              { name: "Samsung", type: "Android", image: "https://i.pinimg.com/474x/05/0a/c9/050ac92cb432973286bbba0b3637f17c.jpg" },
              { name: "Redmi", type: "Android", image: "https://i.pinimg.com/736x/1d/75/3d/1d753d36738603483265513eb070a106.jpg" },
              { name: "Vivo", type: "Android", image: "https://i.pinimg.com/474x/d1/e1/d1/d1e1d1bd9a4c19311611a08fb907547b.jpg" },
            ].map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-4 bg-gray-50 shadow-md rounded-lg"
              >
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-xl">{category.name}</p>
                  <p className="text-gray-500 text-base">{category.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compare Space Section (Removed Content, just white background) */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          {/* Empty section with white background */}
        </div>
      </div>

      {/* Popular Brands Section (Bottom) */}
      <div className="mt-8 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-6">Popular Brand</h2>
        <div className="flex flex-wrap gap-6">
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
              className="w-32 h-32 bg-gray-200 rounded-md flex flex-col items-center justify-center"
            >
              {/* Brand Image */}
              <img
                src={brand.image}
                alt={brand.name}
                className="w-20 h-20 object-cover mb-2 rounded-full"
              />
              <p className="text-sm font-medium text-gray-700">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default After_home_page;
