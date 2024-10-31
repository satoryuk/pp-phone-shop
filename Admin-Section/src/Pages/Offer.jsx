import { useEffect } from "react"

const Offer = () => {

  useEffect(()=>{
    try{
      const res=fetch('https://fakestoreapi.com/products');
      console.log(res);
    }
    catch(err){
      console.log(err);
    }   
  },[])
  return (
    <h1>hi</h1>
  )
}

export default Offer
