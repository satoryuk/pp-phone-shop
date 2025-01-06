// import React from "react";

// const CartItem = ({ image, name, price, quantity, onAdd, onRemove }) => {
//   return (
//     <div className="flex items-center border-b pb-4 mb-4">
//       <img src={image} alt={name} className="w-24 h-24 object-cover" />
//       <div className="ml-4 flex-grow">
//         <p className="font-semibold text-lg">{name}</p>
//         <p className="text-sm text-gray-500">Name Product</p>
//         <button className="text-red-500 text-sm mt-1">Remove</button>
//       </div>
//       <div className="flex items-center">
//         <button onClick={onRemove} className="text-gray-500 px-2">
//           -
//         </button>
//         <input
//           type="text"
//           value={quantity}
//           readOnly
//           className="w-10 text-center border mx-2"
//         />
//         <button onClick={onAdd} className="text-gray-500 px-2">
//           +
//         </button>
//       </div>
//       <p className="w-20 text-right">${price}</p>
//       <p className="w-20 text-right">${price * quantity}</p>
//     </div>
//   );
// };

// export default CartItem;
