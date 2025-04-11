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
  fetchProductByCategory,
  fetchProductByDate,
  fetchProductDiscount,
} from "../../FetchAPI/Fetch";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CustomNextArrow, CustomPrevArrow } from "../../Conponents/Arrow";

const HomePage = () => {
  const [products, setProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [smartWatch, setSmartWatch] = useState([]);
  const [phone, setPhone] = useState([]);
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

  const handleAccessories = async () => {
    try {
      const response = await fetchProductByCategory({
        category: "Accessories",
      });
      setAccessories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePhone = async () => {
    try {
      const response = await fetchProductByCategory({
        category: "Smartphones",
      });
      setPhone(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSmartWatch = async () => {
    try {
      const response = await fetchProductByCategory({
        category: "Smartwatches",
      });
      setSmartWatch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sliderImg = [phone1, phone2, phone3, phone4];

  useEffect(() => {
    handlefetchProduct();
    handleFetchDiscountProduct();
    handleNewArrival();
    handleFetchCategory();
    handleFetchBrand();
    handleAccessories();
    handleSmartWatch();
    handlePhone();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true, // Corrected 'arrow' to 'arrows'
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1200, // For larger screens (e.g., tablets or small desktops)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024, // Standard tablets and smaller desktops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Portrait tablets and large mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 580, // Small mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const settings2 = {
    dots: true, // Show navigation dots
    infinite: true, // Allow infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: true, // Enable arrows
    prevArrow: <CustomPrevArrow />, // Custom previous arrow component
    nextArrow: <CustomNextArrow />, // Custom next arrow component
  };

  return (
    <div>
      {/* Slider */}
      <div className="slider-container w-full bg-gray-50 px-20 py-5">
        <Slider {...settings2}>
          {sliderImg.map((element, index) => (
            <div
              key={index}
              className="flex justify-center items-center mx-[-20px] w-full h-64 rounded-lg  overflow-hidden bg-white"
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
        <div className="flex flex-wrap gap-4 py-5 px-4 items-center justify-center mb-4 rounded-lg shadow-md">
          {brand.map((element, index) => (
            <Card data={element} page="Brands" />
          ))}
        </div>
      </div>

      {/* Specail Offer section */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            SPECIAL OFFER
          </h2>
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

      {/* New Arrived section */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            NEW ARRIVAL
          </h2>
          <Link
            to={`/AfterHomePage?page=NEW ARRIVAL`}
            className="text-blue-500"
          >
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

      {/* Smart Phone section */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            SMART PHONES
          </h2>
          <Link to={`/Sort?category=SmartPhones`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {phone.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Category section */}
      <div className="px-20 py-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
            Categories
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 py-5 px-4 items-center mb-4 rounded-lg shadow-md">
          {category.map((element, index) => (
            <Card data={element} page="Categories" />
          ))}
        </div>
      </div>

      {/* Accessories section */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Accessories
          </h2>
          <Link to={`/Sort?category=Accessories`} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {accessories.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Smart Watch section */}
      <div className="slider-container px-20 py-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Smart Watch
          </h2>
          <Link
            to={`/AfterHomePage?page=Accessories`}
            className="text-blue-500"
          >
            VIEW ALL
          </Link>
        </div>
        <Slider {...settings}>
          {smartWatch.map((product) => (
            <div key={product.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product section */}
      <div className="px-20 py-4">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-gray-900">PRODUCT</h2>
            <Link to={`/AfterHomePage?page=PRODUCT`} className="text-blue-500">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 bg-gray-100 p-4 rounded-lg">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
