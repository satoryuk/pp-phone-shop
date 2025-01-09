import { poster } from "../Assets/image";

const Poster = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <img
          src={poster}
          alt="poster"
          className="h-[700px] w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};
export default Poster;
