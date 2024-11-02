import { NavLink, useLocation, Outlet } from "react-router-dom";
import { logo } from "../../Assets";
import { nav_bar } from "../../Constants";


const RootLayOut = () => {

  const location = useLocation();

  return (

      <main className="flex ">
        <section className="flex-col justify-center p-10 w-[350px] border-r-2 border-b-2 items-center ">
          <div className="flex justify-center">
          <NavLink to='/'><img src={logo} alt="logo" className="mb-36 w-44" /></NavLink>
          </div>
          <div>
            {nav_bar.map(({ img, label, path }) => (
              <NavLink key={label} to={path} className={`flex justify-center items-center w-30 h-15 my-16  
            border-2 px-20 py-2 text-center rounded-xl hover:bg-lightGray  ${location.pathname === `/${path}` ? 'bg-lightGray' : ''}`}>
                <img src={img} alt={label} />
                <p className="font-Roboto text-primary">{label}</p>
              </NavLink>
              
            ))}
          </div>
          </section>
          <section className="flex-1 m-10" >
          <Outlet />
          </section>
      </main>
    
  );
};

export default RootLayOut;
