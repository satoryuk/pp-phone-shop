import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useState } from "react";
import {
  desertColor,
  blackColor,
  silverColor,
  naturalColor,
} from "../Assets/image";
import Card from "./Card";
import { fetchBrand, fetchCategory, fetchdataProduct, fetchProductByDate, fetchProductDiscount } from "../../FetchAPI/Fetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// const products = [
//   { id: 1, name: "Item Name", price: 1000, image: silverColor },
//   { id: 2, name: "Item Name", price: 1000, image: desertColor },
//   { id: 3, name: "Item Name", price: 1000, image: blackColor },
//   { id: 4, name: "Item Name", price: 1000, image: naturalColor },
//   { id: 5, name: "Item Name", price: 1000, image: silverColor },
//   { id: 6, name: "Item Name", price: 1000, image: desertColor },
//   { id: 7, name: "Item Name", price: 1000, image: blackColor },
//   { id: 8, name: "Item Name", price: 1000, image: naturalColor },
//   // Add more products here
// ];

const HomePage = () => {
  const [products, setProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const statusTab = useSelector(store => store.cart.statusTab);

  const handlefetchProduct = async () => {
    const response = await fetchdataProduct();
    setProduct(response.data);
    // console.log(response.data);
  }
  const handleFetchDiscountProduct = async () => {
    const response = await fetchProductDiscount();
    setDiscountProduct(response.data)
  }
  const handleNewArrival = async () => {
    const response = await fetchProductByDate();
    setNewArrival(response.data)
  }
  const handleFetchCategory = async () => {
    try {
      const response = await fetchCategory();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleFetchBrand = async () => {
    try {
      const response = await fetchBrand();
      console.log(response);

      setBrand(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  useEffect(() => {
    handlefetchProduct();
    handleFetchDiscountProduct();
    handleNewArrival();
    handleFetchCategory();
    handleFetchBrand();
  }, [])
  return (
    <div>
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold">SPECIAL OFFER</h2>
          <Link to={`/AfterHomePage?page=DISCOUNT`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {discountProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
            // console.log(products)

          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-[20px] font-bold">CATEGORY</h2>
        <div className="flex flex-wrap gap-4 items-center my-4 bg-gray-50 p-6 rounded-lg shadow-md">
          <Card data={category} page='Categories' />
        </div>
      </div>
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold">NEW ARRIVAL</h2>
          <Link to={`/AfterHomePage?page=NEW ARRIVAL`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {newArrival.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-[20px] font-bold">BRAND</h2>
        <div className="flex flex-wrap gap-4 items-center my-4 bg-gray-50 p-6 rounded-lg shadow-md">
          <Card data={brand} page='Brands' />
        </div>
      </div>
      <div className="px-8 py-4">
        {/* Special Offer Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold">PRODUCT</h2>
            <Link to={`/AfterHomePage?page=PRODUCT`} className="text-blue-500">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* New Arrival Section */}

        {/* Category */}

        {/* Accesories Section */}
      </div>
    </div>
  );
};

export default HomePage;