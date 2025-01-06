import React, { useCallback, useEffect, useState } from 'react'
import { fetchProductByDate, fetchProductDiscount } from '../../FetchAPI/Fetch';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
const AfterHomePage = () => {
    const search = window.location.search;
    const location = useLocation();
    const params = new URLSearchParams(search);
    const page = params.get("page");
    const [data, setData] = useState([]);


    const handleNewArrival = useCallback(async () => {
        try {
            const response = await fetchProductByDate();
            setData(response.data);
        } catch (error) {
            console.log(error);

        }
    }, [])
    const handleDiscount = useCallback(async () => {
        try {
            const response = await fetchProductDiscount();
            setData(response.data)
        } catch (error) {
            console.error(error);

        }
    }, [])
    useEffect(() => {
        if (page === 'NEW ARRIVAL') {
            handleNewArrival();
        }
        else {
            handleDiscount();
        }
    }, [location])

    return (
        <div>
            {console.log(search)
            }
            <h1 className='text-gray-700 text-2xl p-2 py-5 font-bold'>{page}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {data.map((element) => (
                    <ProductCard key={element.id} product={element} />
                ))}
            </div>
        </div>
    )
}

export default AfterHomePage
