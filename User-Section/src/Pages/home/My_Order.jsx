const MyOrderPage = () => {
    return (
        <div>
            <h1 className="text-green-600 text-3xl font-bold mb-4">My Order</h1>

            <div className="space-y-4">
                {myOrderData.map((order) => (
                    <OrderCard key={order.orderNumber} order={order} />
                ))}
            </div>
        </div>
    );
};

export const OrderCard = ({ order }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-full sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
            {/* Order Header */}
            <div className="border-b pb-4">
                <h2 className="text-lg font-bold">Order #{order.orderNumber}</h2>
                <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            {/* Order Items */}
            <div className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={item.image}
                            className="w-16 h-16 rounded"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.description}</p>
                            <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-600">Qty: {item.quantity}</p>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="mt-4 bg-gray-100 p-4 rounded flex justify-between items-center">
                <div>
                    <p className="text-lg font-bold">
                        Total: <span className="text-green-500">${order.total.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        ({order.items.reduce((acc, item) => acc + item.quantity, 0)} Items)
                    </p>
                </div>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Detail
                </button>
            </div>
        </div>
    );
};

// Mo Data
const myOrderData = [
    {
        orderNumber: 351,
        date: "05 Feb 2023, 08:28 PM",
        total: 10.6,
        items: [
            {
                name: "Iphone 18",
                description: "kak Iphone",
                price: 5.3,
                quantity: 1,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKl28AkOioHp5Da87alIOxialChITuJC6JQ&s",
            },
            {
                name: "Hawuwei",
                description: "Fresh Prawn mix salad",
                price: 5.3,
                quantity: 1,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQIjcGLpN1MAfq_KaC9blrkqSRzM2qNdpcg&s",
            },
        ],
    },
    {
        orderNumber: 352,
        date: "06 Feb 2023, 12:00 PM",
        total: 16.5,
        items: [
            {
                name: "Iphone 168",
                description: "Hot and spicy curry with rice",
                price: 7.5,
                quantity: 2,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKl28AkOioHp5Da87alIOxialChITuJC6JQ&s",
            },
            {
                name: "Samsung",
                description: "Refreshing summer drink",
                price: 4.5,
                quantity: 1,
                image: "https://image-us.samsung.com/us/smartphones/galaxy-s24/all-gallery/01_E3_OnlineExclusive_TitaniumBlue_Lockup_1600x1200.jpg?$default-400-jpg$",
            },
        ],
    },
];

export default MyOrderPage;
