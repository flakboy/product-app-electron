import { useEffect, useState } from "react";
import { ProductDetails, ProductId } from "../../types/products";
import { getProductDetails, isHttpStatusOk } from "../../utils/requests";

export function useProductDetails(id: ProductId) {
    const [details, setDetails] = useState<ProductDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchDetails = async (id: ProductId) => {
        const resp = await getProductDetails(id);

        if (!isHttpStatusOk(resp)) {
            setError(
                `Failed to get products details. Status code: ${resp.status}`
            );
        } else {
            const data = (await resp.json()).data as ProductDetails;
            setDetails(data);
        }
    };

    useEffect(() => {
        fetchDetails(id);
    }, []);

    return { details, error };
}
