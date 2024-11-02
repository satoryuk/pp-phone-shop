import TableProduct from "../../Component/TableProduct";
import { dashBoradMain_item } from "../../Constants";

const DashBoardMain = () => {
  return (
    <main>
    <section className="flex flex-wrap ">
      {dashBoradMain_item.map((element) => (
        <div key={element.title} className="bg-lightGray w-[300px] mr-44 mt-24 flex p-7 rounded-xl">
          <div>
            <h1 className="green-txt pb-3 text-2xl">{element.title}</h1>
            <p className="green-txt mb-3">{element.sort}</p>
            <h2 className="green-txt">{element.price}</h2>
          </div>
          <div className="bg-DarkLightGray rounded-full w-10 h-10 flex justify-center items-center ml-auto">
            <img src={element.img} alt={element.title} />
          </div>
        </div>
      ))}
    </section>
    <TableProduct title='Inventory' />
    </main>
  );
};

export default DashBoardMain;
