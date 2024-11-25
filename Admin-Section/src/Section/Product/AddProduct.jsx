import { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [processor, setProcessor] = useState('');
  const [storage, setStorage] = useState('');
  const [camera, setCamera] = useState('');
  const [category, setCategory] = useState('');
  const [colors, setColors] = useState(['']);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [screenSize, setScreenSize] = useState('');
  const [ram, setRam] = useState('');
  const [battery, setBattery] = useState('');


  const handleAddColor = () => {
    setColors([...colors, '']); // Add an empty string to the array, creating a new color input field
  };

  const handleRemoveColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1); // Remove the color at the specified index
    setColors(newColors);
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value; // Update the color value at the specified index
    setColors(newColors);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImages([...images, ...files]); // Append new files to the existing ones
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-4xl mx-auto mt-12 shadow-lg">
      <h1 className="text-center text-3xl text-primary font-bold mb-8">
        Add Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-6"
      >
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            className="input-style"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Category
          </label>
          <input
            type="text"
            name="name_category"
            placeholder="Enter product category"
            className="input-style"
            required
          />
        </div>

        {/* image */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple // This allows multiple files selection
            onChange={handleImageChange}
            className="h-10 w-full rounded-lg border border-gray-300 p-1 mb-2"
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
                  className="absolute top-0 right-0 text-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Color */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">Color</label>
          {colors.map((color, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="h-10 w-full rounded-lg border text-primary p-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg"
          >
            Add Another Color
          </button>
        </div>

        {/* brand */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">Brand</label>
          <input
            type="text"
            name="name_brand"
            placeholder="Enter product brand"
            className="input-style"
            required
          />
        </div>


        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            className="input-style h-28"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            className="input-style"
            required
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter product stock quantity"
            className="input-style"
            required
          />
        </div>

        {/* Release Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Release Date
          </label>
          <input
            type="date"
            name="release_date"
            className="input-style"
            required
          />
        </div>

        {/* Screen Size */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Screen Size
          </label>
          <input
            type="text"
            name="screen_size"
            placeholder="Enter screen size"
            className="input-style"
            required
          />
        </div>

        {/* Processor */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Processor
          </label>
          <input
            type="text"
            name="processor"
            placeholder="Enter processor details"
            className="input-style"
            required
          />
        </div>

        {/* RAM */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">RAM</label>
          <input
            type="text"
            name="ram"
            placeholder="Enter RAM size"
            className="input-style"
            required
          />
        </div>

        {/* Storage */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Storage
          </label>
          <input
            type="text"
            name="storage"
            placeholder="Enter storage capacity"
            className="input-style"
            required
          />
        </div>

        {/* Battery */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Battery
          </label>
          <input
            type="text"
            name="battery"
            placeholder="Enter battery capacity"
            className="input-style"
            required
          />
        </div>

        {/* Camera */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Camera
          </label>
          <input
            type="text"
            name="camera"
            placeholder="Enter camera details"
            className="input-style"
            required
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Submit
          </button>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
