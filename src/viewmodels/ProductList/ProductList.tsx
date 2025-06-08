import { useEffect, useState } from "react";
import { Product } from "../../types/products";

const useProductList = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        setProducts([
            {
                name: "Example product",
                description: "Lorem ipsum",
                id: "512411",
                price: 10000,
            },
            {
                name: "Example product",
                description: "Lorem ipsum",
                id: "512412",
                price: 10000,
            },
            {
                name: "Example product",
                description: "Lorem ipsum",
                id: "512413",
                price: 10000,
            },
        ]);
    }, []);

    return {
        products,
    };
};

export default useProductList;
