import { useState } from "react";
import { addNewBrandAPI } from "../../Fetch/FetchAPI";

const AddBrand = () => {
  const [brand, setBrand] = useState('');
  const [img, setImg] = useState(null);  // Change to null to represent no image selected initially

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the image is selected
    if (!img) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("img", img);


    try {
      // const result = await addNewBrandAPI(formData); // Send the formData containing the image
      // console.log(result);
      console.log(brand);
      console.log(img);
      // Handle success response here (e.g., show success message, clear fields)
    } catch (error) {
      console.log(error);
      // Handle error response here
    }
  };

  // Reset the form
  const handleReset = (e) => {
    e.preventDefault();
    setBrand('');
    setImg(null);  // Reset image input to null
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Get the first file selected
    if (file) {
      setImg(file);  // Set the selected file to the img state
    }
  };

  return (
    <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-4xl mx-auto mt-12 shadow-lg">
      <h1 className="text-center text-3xl text-primary font-bold mb-8">
        Add New Brand
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
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
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
            accept="image/*"
            onChange={handleImageChange}  // Use the handleImageChange function
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
            type="button"
            onClick={(e) => handleReset(e)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
