import React, { useCallback, useEffect, useState } from 'react'
import { fetchProductByBrand, fetchProductByCategory } from '../../FetchAPI/Fetch';
import ProductCard from './ProductCard';

const Category = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const category = params.get("category");
    const brand = params.get("brand");

    const [data, setData] = useState([]);

    const handleData = useCallback(async () => {
        try {
            const response = await fetchProductByCategory({ category: category });
            setData(response.data);
        } catch (error) {
            console.error(error);

        }
    }, [category])
    const handlebrand = useCallback(async () => {
        try {
            const response = await fetchProductByBrand({ brand: brand });
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [brand])


    useEffect(() => {
        if (category) {
            handleData();
        }
        else {
            handlebrand()
        }
    }, [])

    return (
        <div>
            <h1 className='text-gray-800 font-bold my-7 text-2xl ​'>{category || brand}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((element) => (
                    <ProductCard key={element.id} product={element} />
                ))}
            </div>
        </div>
    )
}

export default Category
