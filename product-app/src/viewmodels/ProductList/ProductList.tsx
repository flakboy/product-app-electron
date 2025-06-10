import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductListThunk } from "../../store/slices/products/thunks";
import { formatCurrency } from "../../utils/currency";

const useProductList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProductListThunk());
    }, [dispatch]);

    const { products } = useAppSelector((state) => state.products);

    return {
        status: "success",
        products: products.map((product) => {
            return { ...product, unitPrice: formatCurrency(product.unitPrice) };
        }),
    };
};

export default useProductList;
