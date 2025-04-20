// import { logo } from "../../Assets";
import { Outlet } from "react-router-dom";

const AuthLayOut = () => {
  return (
    <>
      <nav>
        <header>
          {/* <img src={logo} alt="logo" className="p-4 w-[250px] rounded-full" /> */}
        </header>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayOut;
