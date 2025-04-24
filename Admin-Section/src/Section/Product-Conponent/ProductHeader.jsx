import { useState } from "react";
import { add } from "../../Assets";
import Model from "../../Utils/Model/Model";

const ProductHeader = () => {
  return (
    <section className="flex justify-center mb-6">
      <h1 className="text-blue-600 font-bold font-Roboto text-4xl">
        Product Inventory
      </h1>
    </section>
  );
};

export default ProductHeader;
