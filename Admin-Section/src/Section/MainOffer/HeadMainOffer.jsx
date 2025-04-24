import { useState } from "react";
import { offer_header } from "../../Constants";
import { insertPromotion } from "../../Fetch/FetchAPI";

const HeadMainOffer = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState(
    offer_header.reduce((acc, field) => {
      acc[field.dbLabel] = ""; // Initialize all fields as empty strings
      return acc;
    }, {})
  );

  // State to handle feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await insertPromotion({ formData: formData });

      if (!response || response.length === 0) {
        // Handle case when response is null or empty
        setFeedbackMessage(
          "No data returned. Please check your input or try again."
        );
      } else {
        // Handle case when response has data
        setFeedbackMessage("Promotion submitted successfully!");
        console.log("Submitted Data:", response);
        // Optionally reload or reset form here
        window.location.reload();
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Submission Error:", error);
      setFeedbackMessage(
        "An error occurred during submission. Please try again."
      );
    }
  };

  return (
    <div className="p-2">
      <section className="max-w-4xl mx-auto">
        <h1 className="green-title mb-4 blue-text font-semibold text-center">
          Offer Discount
        </h1>
        {console.log(formData)}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offer_header.map((element, index) => (
            <div key={index} className="flex flex-col">
              <label
                htmlFor={element.dbLabel}
                className="text-sm font-medium text-gray-700 mb-2"
              >
                {element.label}
              </label>

              {element.dbLabel === "Color" ? (
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    id={element.dbLabel}
                    value={formData[element.dbLabel]}
                    onChange={handleInputChange}
                    className="h-12 w-72 rounded-md border border-gray-300 shadow-sm cursor-pointer"
                  />
                  <span
                    className="px-8 py-3 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: formData[element.dbLabel],
                      color: "#fff",
                      border: "1px solid #ccc",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {formData[element.dbLabel].toUpperCase()}
                  </span>
                </div>
              ) : (
                <input
                  type={
                    ["start_date", "end_date"].includes(element.dbLabel)
                      ? "date"
                      : "text"
                  }
                  id={element.dbLabel}
                  name={element.dbLabel}
                  placeholder={`Enter ${element.label.toLowerCase()}`}
                  value={formData[element.dbLabel]}
                  onChange={handleInputChange}
                  className="input-style"
                  required
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
            <input
              type="submit"
              value="Submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            />
          </div>
        </form>

        {feedbackMessage && (
          <p className="text-center text-sm mt-4 text-red-600">
            {feedbackMessage}
          </p>
        )}
      </section>
    </div>
  );
};

const FormField = ({ id, label, value, onChange, type }) => (
  <div className="flex flex-col items-start">
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
