import { ProductCategory, ProductSort } from '../../Constants';
const ProductCaterogy = () => {
  return (
    <section className='flex my-24 justify-between'>
        <div className='flex justify-center items-center gap-2'>
          <h2 className='text-primary text-2xl font-bold font-Roboto'>Categories:</h2>
          <select name="category" id="category"className='border-2 py-2 px-5 rounded-xl '>
            {ProductCategory.map(({label})=>(
                <option value={label} key={label} className=''>{label} </option>
            ))}  
          </select>
        </div>
        <div className='flex justify-center items-center gap-2'>
            <h2 className='text-primary text-2xl font-bold font-Roboto'>Sort By:</h2>
            <select name="category" id="category"className='border-2 py-2 px-9 rounded-xl '>
            {ProductSort.map(({label})=>(
                <option value={label} key={label} className=''>{label} </option>
            ))}  
          </select>
        </div>
    </section>
  )
}

export default ProductCaterogy
