import { useState, useEffect } from "react";
import { productByID } from "../Fetch/FetchAPI";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await productByID(id);
      if (!response || !response.data || response.data.length === 0) {
        console.log("No data received or something went wrong");
        return;
      }
      setItems(response.data);
      response.data.map((element) => {
        console.log(element.color);

      })

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-[0_40px_100px_rgba(0,0,0,0.4)] max-w-lg mt-6 p-10 transform rotate-0">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Inventory Detail
      </h1>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {items.length > 0 && (
          <div className="w-full">
            <div className="mb-3">
              <span className="font-semibold">Product code:</span>{" "}
              {items[0].phone_id}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Price:</span> {items[0].price}
            </div>
            <div className="mb-3 flex">
              <span className="font-semibold">Color:</span>
              {items.map((element, index) => (
                <div key={index}>
                  <div key={index} className={`w-5 h-3 rounded-full bg-[${element.color}]`}>
                    hi
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Category:</span>{" "}
              {items[0].category_name}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Inventory:</span>{" "}
              {items[0].stock}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Description:</span>{" "}
              {items[0].description}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Processor:</span>{" "}
              {items[0].processor}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Ram:</span> {items[0].ram}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Screen Size:</span>{" "}
              {items[0].screen_size}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Storage:</span>{" "}
              {items[0].storage}
            </div>
            <button className="mt-6 bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;
