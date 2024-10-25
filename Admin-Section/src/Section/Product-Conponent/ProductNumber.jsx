import { inventory_title } from '../../Constants'

const ProductNumber = () => {
  return (
    <section className="flex gap-10">
        {inventory_title.map(({label,number})=>(
        <div key={label} className="border-r-primary border-r-2 w-56 h-24 flex flex-col justify-center items-center gap-5 ">
            <h2 className="text-primary text-2xl">{label}</h2>
            <p className="text-xl text-primary font-bold">{number}</p>
        </div>
        ))}
    
    </section>
  )
}

export default ProductNumber
