import { useState, useEffect, useCallback } from "react";
import { productByID, removeOneFetch, removeVariants } from "../Fetch/FetchAPI";
import { useNavigate } from "react-router-dom";
import Model from "../Utils/Model/Model";

const Offer = () => {
  const [items, setItems] = useState([]);
  const [arrayImage, setArrayImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false); // Modal open state
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("phone_name"); // Get product id from URL params
  const locate = useNavigate();
  const [Index, setIndex] = useState(0);

  // Fetch product data based on query and Index
  const fetchData = useCallback(async () => {
    try {
      const response = await productByID(query);
      if (!response || !response.data || response.data.length === 0) {
        console.log("No data received or something went wrong");
        return;
      }

      setItems(response.data);
      const images = response.data[Index]?.images
        .split(",") // Split by comma
        .map((image) => image.replaceAll("uploads\\", "").replace(/\s+/g, "")); // Remove backslashes and all whitespaces
      setArrayImage(images);


      if (images.length > 0) {
        setSelectedImage(images[0]); // Set the first image as the default large image
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [query, Index]);

  // Handle deletion of a product
  const handleDelete = async ({ deleteid }) => {
    try {
      await removeVariants({ deleteid });
      setItems(items.filter((item) => item.idphone_variants !== deleteid)); // Remove item from state instead of reloading page
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  // Handle image click to update the selected image
  const handleImageClick = useCallback(
    (image) => {
      if (image !== selectedImage) {
        setSelectedImage(image); // Update only if the image is different
      }
    },
    [selectedImage]
  );
  // Fetch data whenever query or Index changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="container mx-auto bg-white rounded-lg shadow-xl max-w-6xl mt-8 p-8">
      {items.length > 0 && items[Index]?.idphone_variants !== null ? (

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="w-full">
              {selectedImage && (
                <img
                  src={`http://localhost:3000/${selectedImage}`} // Use selectedImage here
                  alt="Product Image"
                  className="w-96 h-96 object-contain rounded-xl shadow-lg transition-transform transform hover:scale-105"
                />
              )}
            </div>
            <div className="flex justify-start gap-6 mt-4 overflow-x-auto overflow-y-hidden max-h-24 max-w-96 scroll-smooth p-2">
              {arrayImage.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 cursor-pointer flex-shrink-0"
                  onClick={() => handleImageClick(image)} // Set large image on click
                >
                  <img
                    src={`http://localhost:3000/${image}`}
                    alt={`Thumbnail Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md transform transition duration-200 hover:scale-110 hover:shadow-lg"
                    loading="lazy" // Enable lazy loading for images
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full space-y-6 px-10">
            <h1 className="text-4xl font-bold text-green-600 mb-6">Product Details</h1>
            <div className="text-3xl font-semibold text-gray-800">
              Product Code: {items[Index]?.phone_id}
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              Color Code: {items[Index]?.idphone_variants}
            </div>
            <div className="text-3xl font-semibold text-gray-800">
              Product Name: {items[Index]?.name}
            </div>
            <div className="text-2xl font-bold text-green-600">
              Price: {items[Index]?.price} USD
            </div>

            {/* Colors */}
            <div className="mb-4">
              <span className="font-semibold">Available Colors:</span>
              <div className="flex gap-3 mt-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setIndex(idx)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="text-lg">
              <span className="font-semibold">Category:</span>{" "}
              {items[Index]?.category_name}
            </div>

            {/* Stock */}
            <div className="text-lg">
              <span className="font-semibold">Stock:</span> {items[Index]?.stock}
            </div>

            {/* Description */}
            <div className="text-lg">
              <span className="font-semibold">Description:</span>{" "}
              {items[Index]?.description}
            </div>

            {/* Specifications */}
            <div className="text-lg">
              <span className="font-semibold">Processor:</span>{" "}
              {items[Index]?.processor}
            </div>
            <div className="text-lg">
              <span className="font-semibold">RAM:</span> {items[Index]?.ram}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Screen Size:</span>{" "}
              {items[Index]?.screen_size}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Storage:</span>{" "}
              {items[Index]?.storage}
            </div>
            <div className="flex gap-10">
              <button
                className="mt-6 bg-green-500 text-white py-4 px-10 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
                onClick={() => setOpen(true)}
              >
                Update
              </button>
              <button
                className="mt-6 bg-red-500 text-white py-4 px-10 rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                onClick={() => handleDelete({ deleteid: items[Index]?.idphone_variants })}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">No data available</div>
      )}

      {/* Modal for Confirmation */}
      <Model
        open={open}
        onClose={() => setOpen(false)}
        id="updateVariants"
        product_id={items[Index]?.idphone_variants || null}
      />
    </div>
  );
};

export default Offer;
