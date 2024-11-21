import { useState } from "react";
import { edit, trash } from "../Assets";
import { tableHead, tableInfor } from "../Constants";
import { Link, } from "react-router-dom";
import { searchFetch } from "../Fetch/FetchAPI";

const TableProduct = ({ title, items }) => {
  const [datatable, setDataTable] = useState(items.data); // Correct initialization
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(tableInfor.map(() => false));
  const [searchData, setSearchData] = useState('');

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(selectedRows.map(() => newSelectAll));
  };

  const handleRowSelect = (index, event) => {
    event.stopPropagation();
    const updatedSelectedRows = [...selectedRows];
    updatedSelectedRows[index] = !updatedSelectedRows[index];
    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.every(Boolean));
  };

  const searchDataFetch = async () => {
    try {
      const data = await searchFetch(searchData);
      setDataTable(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    searchDataFetch();
  };

  return (
    <section className="mt-16 bg-white rounded-lg p-6 sm:p-10 shadow-lg border border-gray-400">
      {console.log(datatable)
      }
      {/* Header Section */}
      {console.log(items.data)
      }
      <section className="flex flex-col sm:flex-row justify-between mx-4 sm:mx-10 mb-5 sm:mb-10">
        <h1 className="green-text mt-4 sm:mt-10 font-semibold text-lg lg:text-3xl">
          {title}
        </h1>
        <form onSubmit={handleSearch} className="flex gap-1 sm:gap-10 items-center mt-3 sm:mt-10">
          <input
            type="text"
            placeholder="Search..."
            className="input-style text-sm sm:text-base"
            onChange={e => setSearchData(e.target.value)}
          />
          <input
            type="submit"
            value={location.pathname === "/product" ? "Export" : "Search"}
            className="green-btn h-10 sm:h-12 w-[100px] sm:w-[120px] text-sm sm:text-base"
          />
        </form>
      </section>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-DarkLightGray text-white border-b-2 border-gray-300">
              {tableHead.map((header, index) => (
                <th
                  key={index}
                  className={`table-data text-sm sm:text-xl px-4 sm:px-6 py-3 sm:py-4 ${index === 0 ? "rounded-l-lg" : ""} border-r border-gray-200`}
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
              <th className="rounded-r-lg text-sm sm:text-xl px-4 sm:px-6 py-3 sm:py-4 border-l border-gray-200"></th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(datatable) && datatable.length > 0 ? (
              datatable.map((element, index) => (
                <tr
                  key={element.phone_id}
                  className="hover:bg-gray-50 transition duration-200 border-b border-gray-200"
                >
                  <td className="table-data px-4 sm:px-6 py-3 sm:py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows[index]}
                      onChange={(e) => handleRowSelect(index, e)}
                      onClick={(e) => e.stopPropagation()} // Prevent navigation on checkbox click
                      className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5"
                    />
                    <Link
                      to={`/order/${element.phone_id}`}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {element.phone_id}
                    </Link>
                  </td>

                  <td className="table-data px-4 sm:px-6 py-3 sm:py-4">
                    <Link
                      to={`/order/${element.phone_id}`}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {element.name}
                    </Link>
                  </td>
                  <td className="table-data px-4 sm:px-6 py-3 sm:py-4">
                    <Link
                      to={`/order/${element.phone_id}`}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {element.category_name}
                    </Link>
                  </td>
                  <td className="table-data px-4 sm:px-6 py-3 sm:py-4">
                    <Link
                      to={`/order/${element.phone_id}`}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {element.price}
                    </Link>
                  </td>
                  <td className="table-data px-4 sm:px-6 py-3 sm:py-4">
                    <Link
                      to={`/order/${element.phone_id}`}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {element.stock}
                    </Link>
                  </td>
                  <td className="table-data flex gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <img src={edit} alt="Edit" className="cursor-pointer" />
                      <img
                        src={trash}
                        alt="Delete"
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-sm sm:text-base py-6"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableProduct;
