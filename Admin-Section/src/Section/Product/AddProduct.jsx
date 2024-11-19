import { Link } from "react-router-dom";

const AddProduct = () => {
  const handleSubmit = () => {};
  return (
    <div className="bg-white p-10 rounded-xl w-full max-w-2xl mx-auto mt-10 shadow-md">
      <h1 className="text-center text-4xl text-green-600 font-semibold mb-10">
        Add Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Product Name:</label>
          <input
            type="text"
            name="productName"
            className="input-style flex-grow"
            required
          />
        </div>

        {/* Category */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Category:</label>
          <input
            type="text"
            name="category"
            className="input-style flex-grow"
            required
          />
        </div>

        {/* Brand */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Brand:</label>
          <input
            type="text"
            name="brand"
            className="input-style flex-grow"
            required
          />
        </div>

        {/* Color */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Color:</label>
          <input type="color" name="color" className="input-style flex-grow" />
        </div>

        {/* Image */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="flex-grow text-primary"
          />
        </div>

        {/* Detail */}
        <div className="flex items-center">
          <label className="w-40 text-lg text-green-600">Detail:</label>
          <textarea
            name="detail"
            className="input-style flex-grow h-24"
            required
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center gap-10 mt-10">
          <button
            type="submit"
            className="green-btn px-6 py-2 text-white text-lg font-semibold"
          >
            Submit
          </button>
          <Link
            to="/"
            className="red-btn px-6 py-2 text-white text-lg font-semibold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
