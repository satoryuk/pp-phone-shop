import { useEffect, useState } from "react";
import { productHeaderData } from "../../Fetch/FetchAPI";

const ProductNumber = () => {
  const [headerData, setHeaderData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const data = await productHeaderData();
        setHeaderData(data.data.data || []); // Update state with data or empty array
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
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 px-4">
      {headerData.map((element, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-6 flex items-center justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Left Section for Label and Quantity */}
          <div>
            <h2 className="text-primary text-lg font-semibold mb-2">
              {element.label}
            </h2>
            <p className="text-2xl text-primary font-bold">
              {element.quantity}
            </p>
          </div>

          {/* Icon Section */}
          <div className="bg-gray-100 rounded-full w-12 h-12 flex justify-center items-center">
            <img
              src={`/assets/icons/${element.label.toLowerCase()}.svg`} // Placeholder for icons based on label
              alt={element.label}
              className="w-8 h-8"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductNumber;
