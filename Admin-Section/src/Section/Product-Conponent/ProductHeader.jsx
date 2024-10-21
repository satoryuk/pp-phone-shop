import { Link } from 'react-router-dom'
import AddProduct from '../../Pages/AddProduct'
import { add } from '../../Assets'

const ProductHeader = () => {
  return (
    <section className="flex justify-between mb-28">
      <h1 className="text-primary font-bold font-Roboto text-5xl">Product Inventory</h1>
      <Link to='add-product' element={<AddProduct/>} className="green-btn">
      <img src={add} alt=""  />
      Add-Product
      </Link>
      </section>
  )
}

export default ProductHeader
