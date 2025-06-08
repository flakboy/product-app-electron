import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductListThunk } from "../../store/slices/products/thunks";

const useProductList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProductListThunk());
    }, [dispatch]);

    const { products } = useAppSelector((state) => state.products);

    return {
        status: "success",
        products,
    };
};

export default useProductList;
