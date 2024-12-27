import { useState } from "react";
import { offer_header } from "../../Constants";
import { insertPromotion } from "../../Fetch/FetchAPI";

const HeadMainOffer = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState(
        offer_header.reduce((acc, field) => {
            acc[field.dbLabel] = field.dbLabel === "Color" ? [""] : ""; // Initialize Color as an array
            return acc;
        }, {})
    );

    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target; // Use id to identify the field
        setFormData((prev) => ({
            ...prev,
            [id]: value, // Update the corresponding field in the state
        }));
    };

    // Handle color change for Color field
    const handleColorChange = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            Color: prev.Color.map((color, i) => (i === index ? value : color)), // Update the specific color
        }));
    };

    // Add a new color input
    const addColor = () => {
        setFormData((prev) => ({
            ...prev,
            Color: [...prev.Color, ""],
        }));
    };

    // Remove a color input
    const removeColor = (index) => {
        setFormData((prev) => ({
            ...prev,
            Color: prev.Color.filter((_, i) => i !== index), // Remove the specific color
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await insertPromotion({ formData: formData });
        if (response.length !== 0) {
            window.location.reload();
        }
        console.log("Submitted Data:", response);
    };

    return (
        <div className="p-6">
            {console.log(formData)}
            <section className="max-w-4xl mx-auto">
                <h1 className="green-title mb-20 green-text font-semibold text-center">
                    Offer Discount
                </h1>
                <form
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    onSubmit={handleSubmit}
                >
                    {offer_header.map((element, index) => (
                        <div
                            key={index}
                            className="col-span-1 md:col-span-2 lg:col-span-3"
                        >
                            {element.dbLabel === "Color" ? (
                                <>
                                    <label
                                        htmlFor="color"
                                        className="text-sm font-medium text-primary mb-2"
                                    >
                                        {element.label}
                                    </label>
                                    {formData.Color.map((color, colorIndex) => (
                                        <div
                                            key={colorIndex}
                                            className="flex items-center gap-4 mb-2"
                                        >
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) =>
                                                    handleColorChange(
                                                        colorIndex,
                                                        e.target.value
                                                    )
                                                }
                                                className="h-10 w-10 p-0 border border-gray-300 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeColor(colorIndex)
                                                }
                                                className="text-sm font-medium text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addColor}
                                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm"
                                    >
                                        Add Color
                                    </button>
                                </>
                            ) : (
                                <FormField
                                    id={element.dbLabel}
                                    label={element.label}
                                    value={formData[element.dbLabel]}
                                    onChange={handleInputChange}
                                    type={
                                        ["start_date", "end_date"].includes(
                                            element.dbLabel
                                        )
                                            ? "date"
                                            : "text"
                                    }
                                />
                            )}
                        </div>
                    ))}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
                        <input
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
                            value="Submit"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

const FormField = ({ id, label, value, onChange, type }) => (
    <div className="flex flex-col items-start">
        <label htmlFor={id} className="text-sm font-medium text-primary mb-2">
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className="input-style h-12 w-full px-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 transition"
            aria-label={label}
        />
    </div>
);

export default HeadMainOffer;
