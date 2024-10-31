import Product from '../../Pages/Product';
import AddProduct from '../../Component/AddProduct';

const Model = ({ isVisible, onClose, id, blogID }) => {
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
      <div className="w-[1200px] flex flex-col">
        <button className="text-primary text-2xl place-self-end" onClick={onClose}>
          X
        </button>
        {id === 'addProduct' ? <AddProduct /> : <Product />}
      </div>
    </div>
  );
};

export default Model;
