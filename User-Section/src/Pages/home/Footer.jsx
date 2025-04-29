import React, { useRef } from "react";
import {
  email,
  call,
  home_address,
  creditCard,
  facebook,
  instagram,
  telegram,
} from "../Assets/image";

const Footer = () => {
  const footerRef = useRef();
  return (
    <div ref={footerRef} id="contact" className="bg-gray-700 text-white">
      {/* Footer Top*/}
      <div className="px-32 py-12 flex justify-between">
        <div className="">
          <h1 className="text-[15px] font-bold">QUICK LINKS</h1>
          <div className="flex flex-col my-10 gap-8">
            <a href="#">Faceook</a>
            <a href="#">Telegram</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="">
          <h1 className="text-[15px] font-bold">CONTACT US</h1>
          <div className="flex flex-col my-10 gap-8">
            <div className="flex">
              <img src={home_address} alt="" className="w-auto h-6" />
              <a href="#">Address: D71 Street 09, Chom Choa, Phnom Penh</a>
            </div>
            <div className="flex">
              <img src={call} alt="" className="w-auto h-6" />
              <a href="#">Phone: 096 877 9593</a>
            </div>
            <div className="flex">
              <img src={email} alt="" className="w-auto h-6" />
              <a href="#">Email: thongvathana22@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-[15px] font-bold">FOLLOW US</h1>
            <div className="flex gap-8">
              <img src={facebook} alt="" className="w-auto h-[35px] my-8" />
              <img src={instagram} alt="" className="w-auto h-[35px] my-8" />
              <img src={telegram} alt="" className="w-auto h-[35px] my-8" />
            </div>
          </div>
          <div>
            <h1 className="text-[15px] font-bold">CREDIT CARD</h1>
            <img src={creditCard} alt="" className="w-auto h-10 mt-8" />
          </div>
        </div>
      </div>
      <hr className="mx-9 border-gray-300" />
      {/* Footer Section */}
      <div className="px-32 py-12 flex justify-between items-center">
        {/* Left Section */}
        <div className="w-1/2">
          <p>
            <span className="text-[22px] font-bold">Phone Shop</span> in Phnom
            Penh buys and sells all kinds of smart phones, smartwatches,
            tablets, and accessories. Shop with us to get the best deals.
          </p>
        </div>

        {/* Right Section */}
        <div className="text-right w-1/2">
          <p>onlinephoneshop@gmail.com</p>
          <p className="font-bold">©2025 COPYRIGHT PHONE SHOP</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
