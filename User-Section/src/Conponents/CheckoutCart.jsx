import React, { useCallback, useEffect, useState } from 'react';
import { fetchProductBySpecID } from '../FetchAPI/Fetch';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const CheckoutCart = ({ items }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const cart = useSelector(store => store.cart.items);
    const [totalQuatity, setTotalQuantity] = useState();
    const [token, setToken] = useState(Cookies.get('access-token'));
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
        <div className='my-3'>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    {data.length > 0 ? (
                        <div className="flex items-center justify-between py-2">
                            {/* Product Image and Name */}
                            <div className="flex items-center w-[175px] gap-2">
                                <img
                                    src={`http://localhost:3000/${data[0].images?.split(',')[0]
                                        ?.trim()
                                        ?.replace(/uploads[\\/]/g, '')
                                        ?.replace(/\s+/g, '')}`}
                                    className="w-12 h-12 object-cover"
                                    alt={data[0]?.name || "Product"}
                                />
                                <p className="text-sm">{data[0]?.name}</p>
                            </div>

                            {/* Quantity - Fixed Width */}
                            <div className="text-center flex-shrink-0 w-12">
                                <p className="text-sm">{items?.quantity}</p>
                            </div>
                            {console.log(Cookies.get('access-token'))
                            }

                            {/* Price */}
                            <div className="flex flex-col items-end w-24">
                                {items.price_discount ? (
                                    <>
                                        <s className="text-gray-500 text-xs">{items?.price_discount}</s>
                                        <p className="text-sm">{items?.price}</p>
                                    </>
                                ) : (
                                    <>
                                        <s className="text-gray-500 text-xs">{items?.price_discount}</s>
                                        <p className="text-sm">{items?.price}</p>
                                    </>
                                )}
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
