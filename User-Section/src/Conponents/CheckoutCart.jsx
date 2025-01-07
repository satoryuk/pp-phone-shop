import React, { useCallback, useEffect, useState } from 'react';
import { fetchProductBySpecID } from '../FetchAPI/Fetch';
import { useSelector } from 'react-redux';

const CheckoutCart = ({ items }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const cart = useSelector(store => store.cart.items);
    const [totalQuatity, setTotalQuantity] = useState();
    const handleFetchData = useCallback(async () => {
        if (!items?.productId) return; // Ensure productId exists before fetching
        try {
            const response = await fetchProductBySpecID({ spec_id: items.productId });
            if (response?.data) {
                setData(response.data);
            } else {
                setError('No data returned from API');
            }
        } catch (err) {
            setError(`Error fetching data: ${err.message}`);
        }
    }, [items?.productId]);

    useEffect(() => {
        handleFetchData();
        let total = 0;
        cart.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [handleFetchData,]);
    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    {data.length > 0 ? (
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <img
                                    src={`http://localhost:3000/${data[0].images?.split(',')[0]
                                        ?.trim()
                                        ?.replace(/uploads[\\/]/g, '')
                                        ?.replace(/\s+/g, '')}`}
                                    className='w-16'
                                />
                                <p>{data[0]?.name}</p>
                            </div>
                            <p className='ml-16'>{items?.quantity}</p>
                            <div className='flex justify-between w-24'>
                                {!items.price_discount ? (<><s>{items?.price_discount}</s><p>{items?.price}</p></>)
                                    : <><s>{items?.price_discount}</s><p>{items?.price}</p></>}
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutCart;
