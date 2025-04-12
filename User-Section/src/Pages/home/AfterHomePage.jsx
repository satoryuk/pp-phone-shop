import React, { useCallback, useEffect, useState } from "react";
import {
  fetchdataProduct,
  fetchProductByDate,
  fetchProductDiscount,
} from "../../FetchAPI/Fetch";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
const AfterHomePage = () => {
  const search = window.location.search;
  const location = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get("page");
  const [data, setData] = useState([]);

  const handleNewArrival = useCallback(async () => {
    try {
      const response = await fetchProductByDate();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleDiscount = useCallback(async () => {
    try {
      const response = await fetchProductDiscount();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const handleProduct = useCallback(async () => {
    try {
      const response = await fetchdataProduct();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  });
  useEffect(() => {
    if (page === "NEW ARRIVAL") {
      handleNewArrival();
    } else if (page === "DISCOUNT") {
      handleDiscount();
    } else {
      handleProduct();
    }
  }, [location]);

  return (
    <div className="px-20 w-full py-6 pb-36 bg-gray-50">
      <h1 className=" text-2xl p-2 py-5 font-bold text-blue-600">{page}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
        {data.map((element) => (
          <ProductCard key={element.id} product={element} />
        ))}
      </div>
    </div>
  );
};

export default AfterHomePage;
