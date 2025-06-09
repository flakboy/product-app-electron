import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";
import {
    getCachedProductList,
    setCachedProductList,
} from "../../../utils/cache";
import { sleep } from "../../../utils/sleep";
import { GATEWAY_URL } from "../../../consts/api";

export const fetchProductListThunk = createAsyncThunk(
    "products/fetchList",
    async (): Promise<Product[]> => {
        try {
            const response = await fetch(`${GATEWAY_URL}/products`, {
                mode: "cors",
            }).then((res) => res.json());

            setCachedProductList(response.data);
            return response.data;
        } catch {
            return getCachedProductList();
        }
    }
);
