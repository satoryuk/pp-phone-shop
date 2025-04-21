import { useEffect, useState } from "react";
import { dashboardHeaderAll, dashboardHeaderData } from "../../Fetch/FetchAPI";
import { dashBoradMain_item } from "../../Constants";
import DashBoardMain from "./DashBoardMain";

const DashBoardHeader = () => {
  const [selectDate, setSelectDate] = useState("ALL");
  const [mergedData, setMergedData] = useState([]);

  const fetchDate = async () => {
    try {
      const response = await dashboardHeaderData(selectDate);
      const data = response.data || [];
      const merged = data.data.map((value, index) => ({
        ...(value || {}), // Ensure value is not null or undefined
        ...(dashBoradMain_item[index] || {}), // Handle mismatched lengths
        date: selectDate, // Add selected date
      }));
      setMergedData(merged); // Set merged data
    } catch (error) {
      console.error("Error fetching date data:", error);
    }
  };

  const fetchAll = async () => {
    try {
      const response = await dashboardHeaderAll();
      const data = response.data || [];
      const merged = data.data.map((value, index) => ({
        ...(value || {}),
        ...(dashBoradMain_item[index] || {}),
        date: "ALL",
      }));
      setMergedData(merged); // Set merged data
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  useEffect(() => {
    if (selectDate === "ALL") {
      fetchAll();
    } else {
      fetchDate();
    }
  }, [selectDate]);

  return (
    <>
      <section className="flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <h1 className="green-txt text-xl max-lg:text-lg">
            Listing Order View
          </h1>
          <select
            name="date"
            id="date"
            className="p-2 px-6 text-sm max-lg:p-1 max-lg:px-4 max-lg:text-xs border-gray-300 border focus:border-blue-600 text-blue-600 rounded-lg"
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="1">Last 1 month</option>
            <option value="2">Last 2 months</option>
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
          </select>
        </div>
      </section>
      <DashBoardMain data={mergedData} selectedDate={selectDate} />
    </>
  );
};

export default DashBoardHeader;
