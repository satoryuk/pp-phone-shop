import { useEffect, useState } from "react";
import TableProduct from "../../Component/TableProduct";
import { productData, tableByDate } from "../../Fetch/FetchAPI";

const DashBoardMain = ({ data, selectedDate }) => {
  const [items, setItems] = useState([]);

  // Function to fetch data based on the selected date
  const fetchDataByDate = async () => {
    try {
      const data = await tableByDate(selectedDate);
      // Use selectedDate here

      setItems(data || []);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await productData();
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate === "ALL") {
      fetchData();
    } else {
      fetchDataByDate();
    }
  }, [selectedDate]); // Watch for changes in selectedDate

  return (
    <main className="pt-4">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 w-full">
        {data.map((element, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md px-6 py-4 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-1 h-14 bg-purple-600 rounded-sm mr-2" />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-gray-600 font-bold text-lg mr-2">
                      {element.label}
                    </h1>
                    <p className="text-red-600 text-sm font-bold">
                      {element.date}
                      <span className="text-gray-600 ml-1 font-bold">
                        month ago!
                      </span>
                    </p>
                  </div>
                </div>
                <h2 className="text-gray-500 text-lg font-bold">
                  {element.total}
                </h2>
              </div>
              <div className="bg-purple-200 rounded-full w-12 h-12 flex justify-center items-center">
                <img
                  src={element.img}
                  alt={element.label}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Render Table for Inventory */}
      <section className="mt-2">
        <TableProduct title="Inventory" items={items.data} />
      </section>
    </main>
  );
};

export default DashBoardMain;
