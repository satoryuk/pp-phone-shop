import React, { useCallback, useEffect, useState } from 'react'
import { fetchProductByCategory } from '../../FetchAPI/Fetch';
import ProductCard from './ProductCard';

const Category = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const category = params.get("category");

    const [data, setData] = useState([]);

    const handleData = useCallback(async () => {
        try {
            const response = await fetchProductByCategory({ category: category });
            setData(response.data);
        } catch (error) {
            console.error(error);

        }
    }, [category])

    useEffect(() => {
        if (category) {
            handleData();
        }
    }, [])

    return (
        <div>
            <h1 className='text-gray-800 font-bold text-xl​​'>CATEGORY</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((element) => (
                    <ProductCard key={element.id} product={element} />
                ))}
            </div>
        </div>
    )
}

export default Category
