import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchdataProduct } from "../../FetchAPI/Fetch";
import ProductCard from "./ProductCard";

const AddToFavorite = () => {
  const [products, setProducts] = useState([]);
  const favorite = useSelector((store) => store.favorite.favorite);

  // Fetch all products
  const handleFetchAllData = async () => {
    try {
      const response = await fetchdataProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Calculate favorite products dynamically
  const favoriteProducts = products.filter((product) =>
    favorite.includes(product.phone_id)
  );

  useEffect(() => {
    handleFetchAllData();
  }, []); // Run only once to fetch data

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-primary p-5 text-2xl font-Jaro">My Wish List</h1>
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.phone_id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your wish list is empty!</p>
      )}
    </div>
  );
};

export default AddToFavorite;
