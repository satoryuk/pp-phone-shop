import { useEffect, useState } from "react";
import { order_header } from "../../Constants";
import { headerOrder } from "../../Fetch/FetchAPI";
// import { data } from "autoprefixer";

const Order_main = () => {
  const [headerData, setHeaderData] = useState([]);
  useEffect(() => {
    const fetchHeaderOrder = async () => {
      try {
        const header = await headerOrder();

        const updatedStatusArray = header.data.map((item, index) => ({
          ...item,
          img: order_header[index]?.img || null, // Assign image or null if undefined
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1), // Capitalize first letter
        }));
        console.log(updatedStatusArray);

        setHeaderData(updatedStatusArray);
      } catch (error) {
        console.error("Error fetching header order:", error);
      }
    };

    fetchHeaderOrder();
  }, []);

  return (
    <main className="pt-1">
      <section className="flex justify-between mb-4">
        <h1 className="green-txt text-4xl max-lg:text-lg">Order</h1>
      </section>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 w-full">
        {headerData.map((element) => (
          <div
            key={element.title}
            className="border border-gray-300 rounded-md px-6 py-3 flex flex-row justify-between gap-10 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Image Section */}

            {/* Text Section */}
            <div className="flex flex-col">
              <h2 className="green-text text-xl font-medium">
                {element.status}
              </h2>
              <p className="text-red-500 text-2xl font-medium pl-3">
                {element.count}
              </p>
            </div>
            <div className="bg-purple-200 rounded-full w-12 h-12 flex justify-center items-center">
              <img src={element.img} alt={element.title} className="w-8 h-8" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Order_main;
