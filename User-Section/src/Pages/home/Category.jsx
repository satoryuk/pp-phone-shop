import React from 'react'

const Category = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const productName = params.get("category");

    return (
        <div>

        </div>
    )
}

export default Category
