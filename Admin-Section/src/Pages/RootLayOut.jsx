import { NavLink, useLocation ,Outlet} from "react-router-dom";
import { logo } from "../Assets";
import { nav_bar } from "../Constants";

const RootLayOut = () => {

  const location=useLocation();

  return (
    <div className="flex gap-16">
    <header className="flex justify-center p-10 w-1/5 border-r-2 border-b-2 items-center h-full ">
      <nav className="flex flex-col items-center justify-center ">
        <img src={logo} alt="logo" className="mb-20 w-40"/>
        <div>
          {nav_bar.map(({ img, label ,path}) => (
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
      <Outlet/>
    </main>
    </div>
  );
};

export default RootLayOut;
