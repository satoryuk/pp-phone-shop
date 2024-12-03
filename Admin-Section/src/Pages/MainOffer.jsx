import { useEffect, useState } from "react";
import TableProduct from "../Component/TableProduct";
import { productData } from "../Fetch/FetchAPI";
import HeadMainOffer from "../Section/MainOffer/HeadMainOffer";

const MainOffer = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productData();
                setItems(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    });
    return (
        <>
            <HeadMainOffer />
            <TableProduct title="Product" items={items} />
        </>
    );
};

export default MainOffer;