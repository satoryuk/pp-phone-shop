import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderByID, fetchOrderItemsByID } from "../../Fetch/FetchAPI";
import Model from "../../Utils/Model/Model";

const Order_By_ID = () => {
  const { id } = useParams();
  const [ordersItems, setOrdersItems] = useState([]);
  const [orders, setOrders] = useState(null)
  const [open, setOpen] = useState(false); // Modal open state

  const fetchDataOrderItems = async () => {
    try {
      const response = await fetchOrderItemsByID(id);
      // console.log(response.data);

      if (!response || !response.data) {
        console.error("No data received");
        return;
      }
      setOrdersItems(response.data);
      console.log(ordersItems)

    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  const fetchDataOrder = async () => {
    try {
      const response = await fetchOrderByID({ id });
      setOrders(response.data);

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchDataOrderItems();
    fetchDataOrder();
  }, [id]);

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-xl max-w-6xl mt-8 p-8">

      {orders ? (
        <div className="space-y-8">
          {/* Customer Details */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">Customer Name</p>
                <p className="text-black font-semibold">{orders[0].username}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="text-black font-semibold">{orders[0].phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="text-black font-semibold">{orders[0].address}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date</p>
                <p className="text-black font-semibold">{formatDate(orders[0].order_date)}</p>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ordered Products</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-6 font-semibold text-gray-500 mb-4">
                <p className="col-span-2">Product</p>
                <p className="text-center">Quantity</p>
                <p className="text-center">Unit Price</p>
                <p className="text-center">Total</p>
              </div>
              {ordersItems.map((orderItems) => (
                <div
                  key={orderItems.id}
                  className="grid grid-cols-6 items-center py-4 border-t"
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      // src={orderItems.image_url}
                      alt={orderItems.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p>{orderItems.name}</p>
                  </div>
                  <p className="text-center">{orderItems.order_quantity}</p>
                  <p className="text-center">{orderItems.order_price}$</p>
                  <p className="text-center font-semibold">{orderItems.amount_order_items}$</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="text-right">
            <div className="flex justify-end gap-8 text-lg mb-2">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-black font-semibold">{orders[0].total_amount}$</p>
            </div>
            <div className="flex justify-end gap-8 text-lg mb-2">
              <p className="text-gray-500">Discount</p>
              <p className="text-black font-semibold">{orders[0].total_amount}$</p>
            </div>
            <div className="flex justify-end gap-8 text-xl font-bold">
              <p className="text-gray-600">Total</p>
              <p className="text-green-600">{orders[0].total_amount}$</p>
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
          <Model open={open} onClose={() => setOpen(false)} id="updateOrder" order_id={orders.id}>
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
