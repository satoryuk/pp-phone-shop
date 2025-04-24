import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { addNewProductAPI } from "../../Fetch/FetchAPI";

const AddProduct = ({ product_id }) => {
  const location = useLocation();
  const fileRef = useRef();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [processor, setProcessor] = useState("");
  const [storage, setStorage] = useState("");
  const [camera, setCamera] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState("#000000"); // Default to one color
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [ram, setRam] = useState("");
  const [battery, setBattery] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setID(product_id);
  }, [product_id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImages([...images, ...files]); // Append new files to the existing ones
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = {
      name,
      brand,
      images,
      price,
      date,
      processor,
      storage,
      camera,
      category,
      colors,
      description,
      stock,
      screenSize,
      ram,
      battery,
    };
    try {
      const result = await addNewProductAPI(formdata, id);
      if (result.lenght !== 0) {
        setResult("Add New Product Success");
        setError("");
      }
      // console.log(formdata.colors);

      // console.log(formdata.images);

      handleClear(); // Clear form after successful submission
      console.log(result);
    } catch (error) {
      setError("Something Went Wrong");
      setResult("");
      console.log(error);
    }
  };

  const handleClear = () => {
    setName("");
    setBrand("");
    setImages([]);
    setPrice("");
    setDate("");
    setProcessor("");
    setStorage("");
    setCamera("");
    setColors([""]);
    setDescription("");
    setStock("");
    setScreenSize("");
    setRam("");
    setBattery("");
    setCategory("");
  };
  return (
    <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-7xl mx-auto mt-7 shadow-lg">
      <h1 className="text-center text-3xl text-gray-700 font-bold mb-8">
        Add Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-5 gap-6"
      >
        {/* Row 1 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            className="input-style"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="name_category"
            placeholder="Enter product category"
            value={category}
            className="input-style"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <input
            type="text"
            name="name_brand"
            placeholder="Enter product brand"
            value={brand}
            className="input-style"
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            value={price}
            className="input-style"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Enter product stock quantity"
            className="input-style"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Release Date
          </label>
          <input
            type="date"
            name="release_date"
            value={date}
            className="input-style"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Screen Size
          </label>
          <input
            type="text"
            name="screen_size"
            value={screenSize}
            placeholder="Enter screen size"
            className="input-style"
            onChange={(e) => setScreenSize(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Processor
          </label>
          <input
            type="text"
            name="processor"
            value={processor}
            placeholder="Enter processor details"
            className="input-style"
            onChange={(e) => setProcessor(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">RAM</label>
          <input
            type="text"
            name="ram"
            placeholder="Enter RAM size"
            className="input-style"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            required
          />
        </div>

        {/* Row 4 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Storage
          </label>
          <input
            type="text"
            name="storage"
            placeholder="Enter storage capacity"
            value={storage}
            className="input-style"
            onChange={(e) => setStorage(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Battery
          </label>
          <input
            type="text"
            name="battery"
            placeholder="Enter battery capacity"
            value={battery}
            className="input-style"
            onChange={(e) => setBattery(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Camera
          </label>
          <input
            type="text"
            name="camera"
            placeholder="Enter camera details"
            className="input-style"
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
            required
          />
        </div>

        {/* Row 5 */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileRef}
            onChange={handleImageChange}
            className="h-12 w-full rounded-lg border border-gray-300 p-2"
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

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-800 mb-2">
            Choose Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="h-12 w-72 rounded-md border border-gray-300 shadow-sm cursor-pointer"
            />
            <span
              className="px-8 py-3 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: colors,
                color: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {colors.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-3">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            className="input-style h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-24 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-28 px-6 py-2 rounded-lg transition"
          />
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold w-28 px-6 py-2 rounded-lg transition"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {result && <p className="text-green-600">{result}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
