import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useState } from "react";
import {
  desertColor,
  blackColor,
  silverColor,
  naturalColor,
  phone1,
  phone2,
  phone3,
  phone4,
} from "../Assets/image";
import Card from "./Card";
import {
  fetchBrand,
  fetchCategory,
  fetchdataProduct,
  fetchProductByDate,
  fetchProductDiscount,
} from "../../FetchAPI/Fetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Poster from "./Poster";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CustomNextArrow, CustomPrevArrow } from "../../Conponents/Arrow";

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
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const statusTab = useSelector((store) => store.cart.statusTab);

  const handlefetchProduct = async () => {
    const response = await fetchdataProduct();
    setProduct(response.data);
    // console.log(response.data);
  };
  const handleFetchDiscountProduct = async () => {
    const response = await fetchProductDiscount();
    setDiscountProduct(response.data);
  };
  const handleNewArrival = async () => {
    const response = await fetchProductByDate();
    setNewArrival(response.data);
  };
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
      setBrand(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const sliderImg = [phone1, phone2, phone3, phone4]

  useEffect(() => {
    handlefetchProduct();
    handleFetchDiscountProduct();
    handleNewArrival();
    handleFetchCategory();
    handleFetchBrand();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <div>
      {/* <div className="px-8 py-4 flex justify-between items-center">
        <Poster />
      </div> */}
      {/* Slider */}

      <div className="slider-container w-full px-4 py-6 bg-gray-50">
        <Slider {...settings2}>
          {sliderImg.map((element, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-full h-64 rounded-lg  overflow-hidden bg-white"
            >
              <img
                src={element}
                alt={`Slider ${index + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </Slider>
      </div>


      {/* Popular-brand section */}
      <div className="px-20 py-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Brands</h1>
        </div>
        <div className="flex flex-wrap gap-4 py-5 px-4 items-center mb-4 rounded-lg shadow-md">

          {brand.map((element, index) => (
            <Card data={element} page="Brands" />
          ))}
        </div>
      </div>

      {/* Specail section */}



      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">SPECIAL OFFER</h2>
          <Link to={`/AfterHomePage?page=DISCOUNT`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {discountProduct.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* New-Arrival section */}
      {/* <div className="px-8 py-4 bg-gray-100 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 my-2">
            NEW ARRIVAL
          </h2>
          <Link
            to={`/AfterHomePage?page=NEW ARRIVAL`}
            className="text-blue-500"
          >
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4 mb-4">
          {newArrival.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div> */}

      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">NEW ARRIVAL</h2>
          <Link to={`/AfterHomePage?page=NEW ARRIVAL`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {newArrival.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>




      {/* Categories section */}
      {/* Smartphones section */}
      {/* <div className="px-8 py-4 bg-gray-100 rounded-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center my-2">
            <h2 className="text-3xl font-extrabold text-gray-900">
              SMART PHONES
            </h2>
            <Link to={`/AfterHomePage?page=PRODUCT`} className="text-blue-500">
              VIEW ALL
            </Link>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              <div className="flex gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Slider>
          </div>
        </div>
      </div> */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">SMART PHONES</h2>
          <Link to={`/AfterHomePage?page=PRODUCT`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="px-20 py-4">

        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Categories</h1>
        </div>
        <div className="flex flex-wrap gap-4 py-5 px-4 items-center mb-4 rounded-lg shadow-md">
          {category.map((element, index) => (
            <Card data={element} page="Categories" />
          ))}
        </div>
      </div>


      {/* Product section */}
      <div className="px-20 py-4">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              PRODUCT
            </h2>
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
      </div>

      {/* Accessories section */}
      {/* <div className="px-8 py-4 bg-gray-100 rounded-lg">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              ACCESSORIES
            </h2>
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
      </div> */}
    </div>
  );
};

export default HomePage;
