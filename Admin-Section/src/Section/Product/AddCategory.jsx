import React from 'react'

const AddCategory = () => {
    
    const handleSubmit=()=>{

    }
    return (
        <div>
        <div className='bg-white p-10 rounded-xl w-full max-w-2xl mx-auto mt-10 shadow-md'>
            <h1 className='green-title text-center'>Add New Category</h1>
            <form onSubmit={handleSubmit} className='my-20 flex flex-col gap-10'>
            <div className="flex items-center">
            <label className="w-40 text-lg text-green-600">Brand:</label>
            <input
                type="text"
                className="input-style flex-grow"
                required
            />
            </div>
                <div className='flex w-40 text-lg text-green-600 gap-28'>
                <label>Picture</label>
                <input type="file" accept='image/*' required className='flex-grow text-primary' />
                </div>
                <div className='flex justify-between mt-10'>
                <input type="submit" className='green-btn' />
                <input type="reset" className='red-btn'/>
                </div>
            </form>
            </div>
        </div>
  )
}

export default AddCategory
