import React, { useRef, useState } from 'react'
import { addNewColorFetch } from '../../Fetch/FetchAPI';

const AddColor = () => {
    const [color, setColor] = useState([]);
    const [productName, setProductName] = useState();
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = {
            color,
            productName,
            stock,
            images
        }
        try {
            const result = await addNewColorFetch(formdata);
            handleClear(); // Clear form after successful submission
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClear = () => {
        setColor(''),
            setProductName(''),
            setStock(''),
            setImages([])
    }

    return (
        <div className="bg-white border-gray-300 border p-8 rounded-lg w-full max-w-4xl mx-auto mt-12 shadow-lg">
            <h1 className="text-center text-3xl text-primary font-bold mb-8">
                Add New Color
            </h1>
            <form
                // onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-6"
            >
                {/* category */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-primary mb-2">Product Name</label>
                    <input
                        type="text"
                        name="brand"
                        value={productName}
                        placeholder="Enter brand name"
                        onChange={(e) => setProductName(e.target.value)}
                        className="input-style"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-primary mb-2">Colors</label>
                    <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow-md">

                        <div className="flex items-center gap-6">

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Color </span>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-6 w-28 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-primary mb-2'>Stock</label>
                    <input
                        type="text"
                        name='stock'
                        placeholder='Enter Stock'
                        value={stock}
                        className='input-style'
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-primary mb-2">
                        Product Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple // This allows multiple files selection
                        ref={fileRef}
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

                {/* Buttons */}
                <div className="md:col-span-2 flex justify-center items-center gap-4 mt-4">
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                        Submit
                    </button>
                    <button
                        onClick={(e) => handleClear(e)}
                        type="reset"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddColor
