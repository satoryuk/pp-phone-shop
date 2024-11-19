import { useEffect, useState } from "react";
import TableProduct from "../Component/TableProduct";
import Offer_header from "../Section/Offer/Offer_header";
import { productData } from "../Fetch/FetchAPI";

const Offer = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productData();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <>
      <Offer_header />
      <TableProduct title="Product" items={items} />
    </>
  );
};

export default Offer;
