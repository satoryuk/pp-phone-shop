import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import RootLayOut from "./Pages/RootLayOut"
import DashBorad from "./Pages/DashBorad"
import Order from "./Pages/Order"
import Product from "./Pages/Product"
import Offer from "./Pages/Offer"
import New1 from "./Pages/new1"


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut/>}>
      <Route index element={<DashBorad/>}/> 
      <Route path="order" element={<Order/>} />
      <Route path="product" element={<Product/>}/>
      <Route path="offer" element={<Offer/>}/>
      <Route path="new1" element={<New1/>}/>
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