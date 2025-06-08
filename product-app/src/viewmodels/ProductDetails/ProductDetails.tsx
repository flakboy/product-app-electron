import { useEffect, useState } from "react";
import { ProductModel } from "../../models/Product";
import { ProductDetails, ProductId } from "../../types/products";

const model = new ProductModel();

export function useProductDetails(id: ProductId) {
    const [details, setDetails] = useState<ProductDetails | null>(null);

    const fetchDetails = async (id: ProductId) => {
        const details = await model.fetchProduct(id);

        setDetails(details);
    };

    useEffect(() => {
        fetchDetails(id);
    }, []);

    return details;
}
