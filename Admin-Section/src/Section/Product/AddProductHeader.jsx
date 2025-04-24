import { Link } from "react-router-dom";
import { ADD } from "../../Assets";

const AddProductHeader = ({
  btn1,
  btn2,
  route1,
  route2,
  btn3,
  route3,
  btn4,
  route4,
}) => {
  return (
    <div className="flex flex-wrap justify-end gap-4 p-4 mr-10">
      {btn1 && route1 && (
        <Link
          className="green-btn text-center py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-700 duration-200"
          to={`/dashboard/${route1}`}
        >
          <img src={ADD} alt="add_icon" className="w-4 h-4 mr-1" />
          {btn1}
        </Link>
      )}
      {btn2 && route2 && (
        <Link
          className="green-btn text-center py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-700 duration-200"
          to={`/dashboard/${route2}`}
        >
          <img src={ADD} alt="add_icon" className="w-4 h-4 mr-1" />
          {btn2}
        </Link>
      )}
      {btn3 && route3 && (
        <Link
          className="green-btn text-center py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-700 duration-200"
          to={`/dashboard/${route3}`}
        >
          <img src={ADD} alt="add_icon" className="w-4 h-4 mr-1" />
          {btn3}
        </Link>
      )}
      {btn4 && route4 && (
        <Link
          className="green-btn text-center py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg hover:bg-blue-700 duration-200"
          to={`/dashboard/${route4}`}
        >
          <img src={ADD} alt="add_icon" className="w-4 h-4 mr-1" />
          {btn4}
        </Link>
      )}
    </div>
  );
};

export default AddProductHeader;
