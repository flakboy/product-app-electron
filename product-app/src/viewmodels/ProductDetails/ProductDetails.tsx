import { useCallback, useEffect, useState } from "react";
import {
    FormattedProductDetails,
    ProductDetails,
    ProductId,
} from "../../types/products";
import { getProductDetails, isHttpStatusOk } from "../../utils/requests";
import { currencyToInteger, formatCurrency } from "../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProductThunk } from "../../store/slices/cart/thunks";

export function useProductDetails(id: ProductId) {
    const [details, setDetails] = useState<FormattedProductDetails | null>(
        null
    );
    const [error, setError] = useState<string | null>(null);
    const isInCart = useAppSelector(
        (state) => !!details && details?.id in state.cart.products
    );

    const dispatch = useAppDispatch();
    const addToCart = useCallback(
        (productDetails: FormattedProductDetails, amount: number) => {
            dispatch(
                addProductThunk({
                    ...productDetails,
                    amount,
                    unitPrice: currencyToInteger(productDetails.unitPrice),
                })
            );
        },
        [details]
    );

    const fetchDetails = async (id: ProductId) => {
        const resp = await getProductDetails(id);

        if (!isHttpStatusOk(resp)) {
            setError(
                `Failed to get products details. Status code: ${resp.status}`
            );
        } else {
            const data = (await resp.json()).data as ProductDetails;
            setDetails({ ...data, unitPrice: formatCurrency(data.unitPrice) });
        }
    };

    useEffect(() => {
        fetchDetails(id);
    }, []);

    return { details, error, addToCart, isInCart };
}
