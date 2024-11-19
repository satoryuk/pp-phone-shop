import { useEffect, useState } from "react";
import TableProduct from "../Component/TableProduct";
import ProductCaterogy from "../Section/Product-Conponent/ProductCaterogy";
import ProductHeader from "../Section/Product-Conponent/ProductHeader";
import ProductNumber from "../Section/Product-Conponent/ProductNumber";
import { productData } from "../Fetch/FetchAPI";

const Product = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productData(); // Wait for the async function to resolve
        setItems(data); // Set the data once it's fetched
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the fetchProducts function inside useEffect
  }, []);
  return (
    <main className="mt-32 w-[1400px]">
      <ProductHeader />
      <ProductNumber />
      <ProductCaterogy />
      <TableProduct title="All Product" />
      {console.log(items)}
    </main>
  );
};

export default Product;
