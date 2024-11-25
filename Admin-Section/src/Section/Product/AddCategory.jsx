import React from "react";

const AddCategory = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-4xl mx-auto mt-12 shadow-lg">
      <h1 className="text-center text-3xl text-primary font-bold mb-8">
        Add New Category
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-6"
      >
        {/* Brand */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand name"
            className="input-style"
            required
          />
        </div>

        {/* Picture */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-primary mb-2">
            Picture
          </label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            className="h-10 w-full rounded-lg border text-primary p-1"
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
          <button
            type="reset"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
