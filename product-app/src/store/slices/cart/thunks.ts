import {
    addProductToCache,
    getCachedCart,
    removeProductFromCache,
} from "../../../utils/cache";

import { ProductId } from "../../../types/products";
import { CartItem, CartItemMap } from "../../../types/cart";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartThunk = createAsyncThunk(
    "cart/fetchCart",
    async (): Promise<CartItemMap> => {
        try {
            const response = await fetch("...").then((res) => res.json());
            return { ...response.data };
        } catch {
            return getCachedCart();
        }
    }
);

export const addProductThunk = createAsyncThunk(
    "cart/addProduct",
    async (payload: CartItem, _): Promise<CartItem> => {
        //send to API and ignore result
        // const _response = fetch("...");

        addProductToCache(payload);

        return payload;
    }
);

export const removeProductThunk = createAsyncThunk(
    "cart/removeProduct",
    async (payload: ProductId, _): Promise<ProductId> => {
        //send to API and ignore result
        // const _response = fetch("...");

        removeProductFromCache(payload);

        return payload;
    }
);
