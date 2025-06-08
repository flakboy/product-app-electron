import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";
import { getCachedProductList } from "../../../utils/cache";

export const fetchProductList = createAsyncThunk(
    "products/fetchList",
    async (): Promise<Product[]> => {
        try {
            const response = await fetch("...").then((res) => res.json());
            return { ...response.data };
        } catch {
            return getCachedProductList();
        }
    }
);
