import { order_header } from "../../Constants";

const Order_main = () => {
  return (
    <>
      <section className="flex justify-between mb-20 mt-32">
        <h1 className="text-primary font-bold font-Roboto text-5xl ">Order</h1>
      </section>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 w-full px-4 ">
        {order_header.map((element) => (
          <div
            key={element.title}
            className="border border-gray-300 rounded-md px-6 py-3 flex flex-row justify-between gap-10 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Image Section */}

            {/* Text Section */}
            <div className="flex flex-col">
              <h2 className="green-text text-xl font-medium">
                {element.title}
              </h2>
              <p className="green-text text-2xl font-medium pl-3">
                {element.quantity}
              </p>
            </div>
            <div className="w-14 h-full flex justify-center items-center">
              <img
                src={element.img}
                alt={element.title}
                className="w-10 h-10"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Order_main;
