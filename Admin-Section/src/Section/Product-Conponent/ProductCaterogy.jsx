import { useEffect, useState } from "react";
import { ProductSort } from "../../Constants";
import { categoryFetch, tableByCategory } from "../../Fetch/FetchAPI";
import TableProduct from "../../Component/TableProduct";
const ProductCaterogy = () => {
  const [category, setCategory] = useState([]);
  const [select, setSelect] = useState("Smartphones");
  const [items, setItems] = useState([]);

  const fetchCategory = async () => {
    try {
      const data = await categoryFetch();
      console.log("here category" + data);

      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await tableByCategory({ category: select }); // Wait for the async function to resolve
      setItems(data); // Set the data once it's fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [select]);
  return (
    <>
      <section className="flex mt-4 justify-between">
        <div className="flex justify-center items-center gap-2">
          <h2 className="green-txt text-xl max-lg:text-lg">Categories:</h2>

          <select
            name="category"
            id="category"
            className="p-2 px-6 text-sm max-lg:p-1 max-lg:px-4 max-lg:text-xs border-gray-300 border focus:border-blue-600 text-blue-600 rounded-lg"
            onChange={(e) => setSelect(e.target.value)}
          >
            {category.map((element) => (
              <option
                value={element.category_name}
                key={element.category_name}
                className=""
              >
                {element.category_name}
                {""}
              </option>
            ))}
          </select>
        </div>
      </section>
      <TableProduct title="All Product" items={items} category={select} />
      {console.log("here is your items")}
    </>
  );
};

export default ProductCaterogy;
