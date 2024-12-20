import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderByID, fetchOrderItemsByID } from "../../Fetch/FetchAPI";
import Model from "../../Utils/Model/Model";
import { trash } from "../../Assets";

const Order_By_ID = () => {
  const { id } = useParams();
  const [ordersItems, setOrdersItems] = useState([]);
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState(false); // Modal open state

  const fetchDataOrderItems = async () => {
    try {
      const response = await fetchOrderItemsByID(id);
      if (response && response.data) {
        setOrdersItems(response.data);
      } else {
        console.error("No order items data received");
      }
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const fetchDataOrder = async () => {
    try {
      const response = await fetchOrderByID({ id });
      if (response && response.data) {
        setOrders(response.data);
      } else {
        console.error("No order data received");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchDataOrderItems();
    fetchDataOrder();
  }, [id]);

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-xl max-w-6xl mt-8 p-8">
      {console.log(ordersItems)
      }

      {orders ? (
        <div className="space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">Customer Name</p>
                <p className="text-black font-semibold">{orders[0]?.username || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="text-black font-semibold">{orders[0]?.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="text-black font-semibold">{orders[0]?.address || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date</p>
                <p className="text-black font-semibold">
                  {formatDate(orders[0]?.order_date) || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ordered Products</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-7 font-semibold text-gray-500 mb-4">
                <p className="col-span-2">Product</p>
                <p className="text-center">Quantity</p>
                <p className="text-center">Unit Price</p>
                <p className="text-center">Unit Discount Price</p>
                <p className="text-center">Total</p>
                <p className="text-center">Discount Percentage</p>
                <p><img src={trash} alt="" /></p>
              </div>
              {ordersItems.length > 0 ? (
                ordersItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 items-center py-4 border-t"
                  >
                    <div className="col-span-2 flex items-center gap-4">

                      <img
                        src={`http://localhost:3000/${item.images?.split(',')[0] || 'fallback.jpg'}`} // Add a fallback image
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <p>{item.name}</p>
                    </div>
                    <p className="text-center">{item.order_quantity}</p>
                    <p className="text-center">{item.order_price}$</p>
                    <p className="text-center">{item.discount_price_unit}$</p>
                    <p className="text-center font-semibold">{item.amount_order_items}$</p>
                    <p className="text-center font-semibold">{item.discount_amount}$</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No products found.</p>
              )}
            </div>
          </div>

          {/* Summary and Actions */}
          <div className="text-right">
            <div className="flex justify-end gap-8 text-lg mb-2">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-black font-semibold">{ordersItems[0]?.totalAmount || "N/A"}$</p>
            </div>
            <div className="flex justify-end gap-8 text-lg mb-2">
              <p className="text-gray-500">Discount</p>
              <p className="text-black font-semibold">{ordersItems[0]?.total_discount_amount || "N/A"}$</p>
            </div>
            <div className="flex justify-end gap-8 text-xl font-bold">
              <p className="text-gray-600">Total</p>
              <p className="text-green-600">{ordersItems[0]?.total_discount_amount || "N/A"}$</p>
            </div>
          </div>

          {/* Update Order Button */}
          <div className="text-right">
            <button
              className="bg-green-500 text-white py-4 px-10 rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
              onClick={() => setOpen(true)}
            >
              Update Order
            </button>
          </div>

          {/* Modal for Updating Order */}
          <Model
            open={open}
            onClose={() => setOpen(false)}
            id="updateOrder"
            order_id={orders[0]?.id || id} // Ensure a valid order_id
          >
            <div className="text-center">
              <h3 className="text-lg font-black text-gray-800">Update Order</h3>
              <p className="text-sm text-gray-500">Modify the order details below.</p>
              {/* Add form or functionality to handle updates */}
            </div>
          </Model>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading order details...</div>
      )}
    </div>
  );
};

export default Order_By_ID;
