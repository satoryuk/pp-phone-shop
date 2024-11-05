import { useState } from "react";
import { edit, trash } from "../Assets";
import { tableHead, tableInfor } from "../Constants";
import { Link, useLocation } from "react-router-dom";

const TableProduct = ({ title }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(
    tableInfor.map(() => false)
  );
  const location = useLocation();

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(selectedRows.map(() => newSelectAll));
  };

  const handleRowSelect = (index, event) => {
    // Prevent navigation when clicking on checkbox
    event.stopPropagation();
    const updatedSelectedRows = [...selectedRows];
    updatedSelectedRows[index] = !updatedSelectedRows[index];
    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.every(Boolean));
  };

  return (
    <section className="mt-16 bg-lightGray rounded-lg p-10 shadow-lg">
      <section className="flex justify-between mx-10 mb-10">
        <h1 className="green-text mt-10 font-semibold text-3xl">{title}</h1>
        <form className="flex gap-10 items-center mt-10">
          <input type="text" placeholder="Search..." className="input-style" />
          <input
            type="submit"
            value={location.pathname === '/product' ? 'Export' : 'Search'}
            className="green-btn h-12 w-[120px]"
          />
        </form>
      </section>
      
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-DarkLightGray from-green-500 to-green-700 text-white">
            {tableHead.map((header, index) => (
              <th
                key={index}
                className={`table-data text-xl px-6 py-4 ${
                  index === 0 ? "rounded-l-lg" : ""
                }`}
              >
                {header === "ID" ? (
                  <>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="mr-3 h-5 w-5 border-2 border-white rounded"
                    />
                    {header}
                  </>
                ) : (
                  header
                )}
              </th>
            ))}
            <th className="rounded-r-lg text-xl px-6 py-4"></th>
          </tr>
        </thead>
        
        <tbody>
          {tableInfor.map((element, index) => (
            <tr key={element.id} className="hover:bg-gray-100 transition duration-200">
              <td className="table-data px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedRows[index]}
                  onChange={(e) => handleRowSelect(index, e)}
                  onClick={(e) => e.stopPropagation()} // Prevent navigation on checkbox click
                  className="mr-3"
                />
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.id}
                </Link>
              </td>
              <td className="table-data ">
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.productCode}
                </Link>
              </td>
              <td className="table-data ">
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.productName}
                </Link>
              </td>
              <td className="table-data ">
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.category}
                </Link>
              </td>
              <td className="table-data ">
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.price}
                </Link>
              </td>
              <td className="table-data ">
                <Link to={`/order/${element.id}`} className="hover:underline">
                  {element.inventory}
                </Link>
              </td>
              <td className="table-data flex gap-2">
                <img src={edit} alt="Edit" className="cursor-pointer" />
                <img src={trash} alt="Delete" className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableProduct;
