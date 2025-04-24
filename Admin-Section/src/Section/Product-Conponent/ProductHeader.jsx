import { useState } from "react";
import { add } from "../../Assets";
import Model from "../../Utils/Model/Model";

const ProductHeader = () => {
  return (
    <section className="flex justify-between mb-4">
      <h1 className="text-gray-600 font-bold font-Roboto text-4xl ">
        Product Inventory
      </h1>
    </section>
  );
};

export default ProductHeader;
