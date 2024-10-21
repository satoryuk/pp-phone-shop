import ProductCaterogy from "../Section/Product-Conponent/ProductCaterogy"
import ProductHeader from "../Section/Product-Conponent/ProductHeader"
import ProductNumber from "../Section/Product-Conponent/ProductNumber"
import ProductTable from "../Section/Product-Conponent/ProductTable"

const Product = () => {
  return (
    
      <main className="mt-20 w-[1250px]">
        <ProductHeader/>
        <ProductNumber/>
        <ProductCaterogy/>
        <ProductTable/>
      </main>
    
  )
}

export default Product
