import React from 'react'

const UpdateOrder = ({ order_detail }) => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <h1>Order Update</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-primary mb-2'>Product</label>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default UpdateOrder
