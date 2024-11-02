import TableProduct from "../Component/TableProduct"
import ProductCaterogy from "../Section/Product-Conponent/ProductCaterogy"
import ProductHeader from "../Section/Product-Conponent/ProductHeader"
import ProductNumber from "../Section/Product-Conponent/ProductNumber"

const Product = () => {

  
  return (
    
      <main className="mt-32 w-[1400px]">
        <ProductHeader/>
        <ProductNumber/>
        <ProductCaterogy/>
        <TableProduct title='All Product'/>
      </main>
    
  )
}

export default Product
