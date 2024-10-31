import { useState } from 'react';
import { add } from '../../Assets';
import Model from '../../Utils/Model/Model';

const ProductHeader = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="flex justify-between mb-28">
      <h1 className="text-primary font-bold font-Roboto text-5xl ">Product Inventory</h1>
      <button className="green-btn" onClick={() => setVisible(true)}>
        <img src={add} alt="" />
        Add Product
      </button>
      <Model id="addProduct" isVisible={visible} onClose={() => setVisible(false)} />
    </section>
  );
};

export default ProductHeader;
