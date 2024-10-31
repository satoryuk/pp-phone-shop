import { Link } from "react-router-dom"

const AddProduct = () => {
  const handleSubmit=()=>{

  }
  return (
    <div className="bg-white px-14 pb-10 rounded-xl flex">
      <div>
      <h1 className="text-center p-14 green-txt text-4xl">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label className="green-txt">Product Name:</label>
        <input type="text" className="input-style ml-12"/><br /><br /><br />
        <label className="green-txt">Category:</label>
        <input type="text" className="input-style ml-[85px]" /><br /><br /><br />
        <label className="green-txt ">Brand:</label>
        <input type="text" className="input-style ml-[110px]"/><br /><br /><br />
        <label className="green-txt">Color:</label>
        <input type="color" className="input-style ml-[110px]"/><br /><br /><br />
        <label className="green-txt">Image:</label>
        <input type="file" accept="/image" className="text-primary ml-[102px]"/><br /><br /><br />
        <label className="green-txt">Detail:</label>
        <input type="text" className="input-style ml-[100px]"/><br /><br />
      </form>
      <div className="flex gap-28 mt-20">
      <Link className="green-btn">Submit</Link>
      <Link  className="red-btn ">Cancel</Link>
      </div>
      </div>
      {/* show post  */}
      <div className="border-primary border-2 w-[580px] my-14 ml-10">

      </div>
    </div>
  )
}

export default AddProduct
