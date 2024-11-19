import { useEffect, useState } from "react";
import TableProduct from "../../Component/TableProduct";
import { dashBoradMain_item } from "../../Constants";
import { productData } from "../../Fetch/FetchAPI";

const DashBoardMain = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productData();
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Render a loading state while fetching data

  return (
    <main className="pt-20">
      {/* Section for Dashboard Items */}
      <section className="grid grid-cols-1 gap-20 lg:grid-cols-2 xl:grid-cols-3 w-full">
        {dashBoradMain_item.map((element, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-6 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow "
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-primary text-lg font-semibold mb-2">
                  {element.title}
                </h1>
                <p className="text-gray-600 text-sm">{element.sort}</p>
                <h2 className="text-primary text-xl font-bold">
                  {element.price}
                </h2>
              </div>
              <div className="bg-gray-100 rounded-full w-12 h-12 flex justify-center items-center">
                <img
                  src={element.img}
                  alt={element.title}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Section for Inventory Table */}
      <section className="mt-10">
        <TableProduct title="Inventory" items={items} />
      </section>
    </main>
  );
};

export default DashBoardMain;
