import { order_header } from "../../Constants";

const Order_main = () => {
  return (
    <section className="flex justify-between">
      {order_header.map((element) => (
        <div
          key={element.title}
          className="flex bg-lightGray w-72 h-48 items-center justify-center gap-5 rounded-xl"
        >
          <img src={element.img} alt="" className="w-14" />
          <p className="green-text">{element.title}</p>
        </div>
      ))}
    </section>
  );
};

export default Order_main;
