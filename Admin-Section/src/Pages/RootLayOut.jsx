import { NavLink, useLocation, Outlet } from "react-router-dom";
import { logo } from "../Assets";
import { nav_bar } from "../Constants";


const RootLayOut = () => {

  const location = useLocation();

  return (
    <>
      <header className="flex justify-center p-10 w-[320px] border-r-2 border-b-2 items-center  ">
        <nav>
          <img src={logo} alt="logo" className="mb-36 w-44" />
          <div>
            {nav_bar.map(({ img, label, path }) => (
              <NavLink key={label} to={path} className={`flex justify-center items-center w-30 h-15 my-20  
            border-2 px-20 py-2 text-center rounded-xl hover:bg-lightGray  ${location.pathname === `/${path}` ? 'bg-lightGray' : ''}`}>
                <img src={img} alt={label} />
                <p className="font-Roboto text-primary">{label}</p>
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayOut;
