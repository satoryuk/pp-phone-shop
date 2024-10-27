import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider ,Link, useNavigate} from "react-router-dom"
import RootLayOut from "./Pages/RootLayOut"
import DashBorad from "./Pages/DashBorad"
import Order from "./Pages/Order"
import Product from "./Pages/Product"
import Offer from "./Pages/Offer"


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut/>}>
      <Route index element={<DashBorad/>}/> 
      <Route path="order" element={<Order/>} />
      <Route path="product" element={<Product/>}/>
      <Route path="offer" element={<Offer/>}/>\
      
    </Route>
  )
)


export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
};