import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import RootLayOut from "./Pages/Root/RootLayOut"
import DashBorad from "./Pages/DashBorad"
import Order from "./Pages/Order"
import Product from "./Pages/Product"
import Offer from "./Pages/Offer"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import AuthLayOut from "./Pages/Root/AuthLayOut"


const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayOut/>}>
      <Route index element={<DashBorad/>}/> 
      <Route path="order" element={<Order/>} />
      <Route path="product" element={<Product/>}/>
      <Route path="offer" element={<Offer/>}/>
    </Route>
    <Route path="auth" element={<AuthLayOut/>}>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
    </Route>
    </>
  )
)


export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
};