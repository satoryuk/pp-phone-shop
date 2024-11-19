import { useEffect, useState } from "react";
import TableProduct from "../../Component/TableProduct";
import Order_main from "../../Section/Order/Order_main";
import { productData } from "../../Fetch/FetchAPI";

const Order = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await productData();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  });
  return (
    <section>
      <Order_main />
      <TableProduct title="Order" items={items} />
    </section>
  );
};

export default Order;
