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
    <section className="mt-16 bg-lightGray rounded-lg p-5 sm:p-10 shadow-lg">
      <section className="flex flex-col sm:flex-row justify-between mx-4 sm:mx-10 mb-5 sm:mb-10">
        <h1 className="green-text mt-4 sm:mt-10 font-semibold text-lg lg:text-3xl">
          {title}
        </h1>
        <form className="flex gap-1 sm:gap-10 items-center mt-3 sm:mt-10">
          <input
            type="text"
            placeholder="Search..."
            className="input-style text-sm sm:text-base"
          />
          <input
            type="submit"
            value={location.pathname === "/product" ? "Export" : "Search"}
            className="green-btn h-10 sm:h-12 w-[100px] sm:w-[120px] text-sm sm:text-base"
          />
        </form>
      </section>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-DarkLightGray from-green-500 to-green-700 text-white">
              {tableHead.map((header, index) => (
                <th
                  key={index}
                  className={`table-data text-sm sm:text-xl px-2 sm:px-6 py-2 sm:py-4 ${
                    index === 0 ? "rounded-l-lg" : ""
                  }`}
                >
                  {header === "ID" ? (
                    <>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 border-2 border-white rounded"
                      />
                      {header}
                    </>
                  ) : (
                    header
                  )}
                </th>
              ))}
              <th className="rounded-r-lg text-sm sm:text-xl px-2 sm:px-6 py-2 sm:py-4"></th>
            </tr>
          </thead>

          <tbody>
            {tableInfor.map((element, index) => (
              <tr
                key={element.id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="table-data px-2 sm:px-6 py-2 sm:py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows[index]}
                    onChange={(e) => handleRowSelect(index, e)}
                    onClick={(e) => e.stopPropagation()} // Prevent navigation on checkbox click
                    className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5"
                  />
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.id}
                  </Link>
                </td>
                <td className="table-data">
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.productCode}
                  </Link>
                </td>
                <td className="table-data">
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.productName}
                  </Link>
                </td>
                <td className="table-data">
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.category}
                  </Link>
                </td>
                <td className="table-data">
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.price}
                  </Link>
                </td>
                <td className="table-data">
                  <Link
                    to={`/order/${element.id}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {element.inventory}
                  </Link>
                </td>
                <td className="table-data flex gap-1 sm:gap-2">
                  <img src={edit} alt="Edit" className="cursor-pointer" />
                  <img src={trash} alt="Delete" className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableProduct;
