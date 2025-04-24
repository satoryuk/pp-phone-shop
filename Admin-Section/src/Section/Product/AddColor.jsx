import React, { useRef, useState } from "react";
import { addNewColorFetch } from "../../Fetch/FetchAPI";
import { AxiosError } from "axios";

const AddColor = () => {
  const [color, setColor] = useState("#000000");
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImages([...images, ...files]); // Append new files to the existing ones
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    if (!productName.trim()) {
      setError("Product name is required.");
      return false;
    }
    if (!color) {
      setError("Please select a color.");
      return false;
    }
    if (!images.length) {
      setError("Please upload at least one image.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      color,
      productName,
      stock: stock || 0, // Default stock to 0 if empty
      images,
    };

    try {
      const response = await addNewColorFetch(formData);
      handleClear(); // Clear form after successful submission
      if (response.length !== 0) {
        setResult("Successfully added the new color.");
      }
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add the new color. Please try again.");
      setResult("");
    }
  };

  const handleClear = () => {
    setColor("");
    setProductName("");
    setStock("");
    setImages([]);
    setError("");
    setResult("");
  };

  return (
    <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-4xl mx-auto mt-12 shadow-lg">
      <h1 className="text-center text-3xl text-blue-600 font-bold mb-8">
        Add New Color
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-6">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            placeholder="Enter product name"
            onChange={(e) => setProductName(e.target.value)}
            className="input-style"
            required
          />
        </div>

        {/* Color */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Choose Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-12 w-72 rounded-md border border-gray-300 shadow-sm cursor-pointer"
              required
            />
            <span
              className="px-8 py-3 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: color,
                color: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {color.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="text"
            value={stock}
            placeholder="Enter stock"
            onChange={(e) => setStock(e.target.value)}
            className="input-style"
          />
        </div>

        {/* Images */}
        <div className="flex flex-col mt-2">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileRef}
            onChange={handleImageChange}
            className="input-style h-12 p-2"
            required
          />
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index + 1}`}
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-1 shadow-md"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-center items-center gap-16 mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition w-32"
          >
            Submit
          </button>
          <button
            type="reset"
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition w-32"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Feedback */}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && <p className="text-green-600 mt-4">{result}</p>}
    </div>
  );
};

export default AddColor;
