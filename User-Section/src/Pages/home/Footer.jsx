import React from "react";

const Footer = () => {
  return (
    <div className="bg-green-600 text-white">
      {/* Footer Top*/}
      <div className="px-8 py-4 flex justify-between">
        <div className="">
          <h1 className="text-[15px] font-bold">QUICK LINKS</h1>
          <div className="flex flex-col my-4 gap-3">
            <a href="#">Faceook</a>
            <a href="#">Telegram</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="">
          <h1 className="text-[15px] font-bold">CONTACT US</h1>
          <div className="flex flex-col my-4 gap-3">
            <a href="#">Address: សង្កាត់ទឹកល្អក១ ខណ្ឌទួលគោក រាធានីភ្នំពេញ</a>
            <a href="#">Phone: 096 888 750</a>
            <a href="#">Email: thongvathana22@gmail.com</a>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-[15px] font-bold">FOLLOW US</h1>
          </div>
          <div>
            <h1 className="text-[15px] font-bold">CREDIT CARD</h1>
          </div>
        </div>
      </div>
      <hr className="mx-9 border-gray-300" />
      {/* Footer Section */}
      <div className="px-8 py-4 flex justify-between items-center">
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
          <p className="font-bold">© COPYRIGHT PHONE SHOP</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
