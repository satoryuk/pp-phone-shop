import { useState } from "react";
import { add } from "../../Assets";
import Model from "../../Utils/Model/Model";

const ProductHeader = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="flex justify-between mb-28">
      <h1 className="text-primary font-bold font-Roboto text-5xl ">
        Product Inventory
      </h1>
    </section>
  );
};

export default ProductHeader;
