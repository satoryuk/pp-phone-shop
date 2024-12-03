import React from "react";

const Compare = () => {
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

        {/* Compare Space Section (Right Side) */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-6">Compare Space</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "iPhone 14 Pro Max",
                color: "Black Titanium",
                capacity: "256GB, 1TB",
                display: "XDR 6.7 Display",
                chip: "A18 Pro Chip Super",
                camera: "48MP Fusion",
                battery: "4890MAH 20W",
                price: "$899",
                image:
                  "https://i.pinimg.com/736x/da/db/d6/dadbd6316422e3e2a78b6f6f30b6e232.jpg",
              },
              {
                name: "Samsung Galaxy S24",
                color: "Gray Natural",
                capacity: "256GB, 1TB",
                display: "XDynamic LTPO",
                chip: "Snap Dragon Pro",
                camera: "200MP 4320k",
                battery: "5000MAH 60W",
                price: "$1199",
                image:
                  "https://i.pinimg.com/736x/5b/d8/93/5bd893c5ec4277bc4cff54fbb3e79afb.jpg",
              },
              {
                name: "Redmi Note 13 Pro",
                color: "Black, White",
                capacity: "256GB, 1TB",
                display: "A1 6.7 Display",
                chip: "A20 Snap GenZ",
                camera: "40MP 2K",
                battery: "5000MP Super",
                price: "$599",
                image:
                  "https://i.pinimg.com/736x/b8/38/cd/b838cd9be1c5616515d378a13c796f6e.jpg",
              },
              {
                name: "Vivo Y17S Pro Series",
                color: "Black Edition",
                capacity: "256GB, 1TB",
                display: "XPro Display",
                chip: "A44 SnapChips",
                camera: "34MP 1440k",
                battery: "4400MAH 40W",
                price: "$499",
                image:
                  "https://i.pinimg.com/736x/39/c3/32/39c332e54a36055deb44abfd2558b609.jpg",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow-md rounded-md p-4 text-sm"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                <p>
                  <span className="font-medium">Color:</span> {product.color}
                </p>
                <p>
                  <span className="font-medium">Capacity:</span>{" "}
                  {product.capacity}
                </p>
                <p>
                  <span className="font-medium">Display:</span>{" "}
                  {product.display}
                </p>
                <p>
                  <span className="font-medium">Chip:</span> {product.chip}
                </p>
                <p>
                  <span className="font-medium">Camera:</span> {product.camera}
                </p>
                <p>
                  <span className="font-medium">Battery:</span>{" "}
                  {product.battery}
                </p>
                <p className="font-bold text-red-500 mt-2">
                  Price: {product.price}
                </p>
              </div>
            ))}
          </div>
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

export default Compare;
