import { useState } from "react";
import { edit, trash } from "../Assets";
import { tableHead, tableInfor } from "../Constants";
import { useLocation } from "react-router-dom";

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

  const handleRowSelect = (index) => {
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
            {/* Add an extra header cell for the icons with rounded right corners */}
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
                  onChange={() => handleRowSelect(index)}
                  className="mr-3"
                />
                {element.id}
              </td>
              <td className="table-data ">{element.productCode}</td>
              <td className="table-data ">{element.productName}</td>
              <td className="table-data ">{element.category}</td>
              <td className="table-data ">{element.price}</td>
              <td className="table-data ">{element.inventory}</td>
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
