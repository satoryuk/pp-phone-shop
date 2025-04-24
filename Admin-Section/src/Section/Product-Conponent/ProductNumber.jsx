import { useEffect, useState } from "react";
import { productHeaderData } from "../../Fetch/FetchAPI";
import { productHeader } from "../../Constants";

const ProductNumber = () => {
  const [headerData, setHeaderData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        // Fetch data from API
        const response = await productHeaderData();
        const apiData = response.data.data || []; // Fetched data

        // Combine fetched data with productHeader
        const mergedData = apiData.map((item, index) => ({
          ...item,
          ...productHeader[index], // Add properties from productHeader to each fetched item
        }));

        setHeaderData(mergedData); // Update state with merged data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchHeader();
  }, []);

  // Render a loading message if data is still being fetched
  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {console.log(headerData)}
      {headerData.map((element, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-md px-6 py-3 flex flex-row justify-between gap-10 bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Left Section for Label and Quantity */}
          <div>
            <h2 className="text-gray-600 text-xl font-medium mb-2">
              {element.label}
            </h2>
            <p className="text-2xl text-red-500 font-medium pl-3">
              {element.quantity}
            </p>
          </div>

          {/* Icon Section */}
          <div className="bg-purple-200 rounded-full w-12 h-12 flex justify-center items-center">
            <img
              src={element.img} // Placeholder for icons based on label
              alt={element.img}
              className="w-8 h-8"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductNumber;
