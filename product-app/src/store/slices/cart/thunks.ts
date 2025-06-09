import {
    addProductToCache,
    getCachedCart,
    getCachedCartId,
    removeProductFromCache,
    setCachedCartId,
    setCachedProductList,
} from "../../../utils/cache";

import { ProductId } from "../../../types/products";
import { CartItem } from "../../../types/cart";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    CartProductResponse,
    getCartProducts,
    getUserCart,
    postUserCart,
} from "../../../utils/cart";
import { CartSliceState, FetchedCart } from "./types";
import { isHttpStatusOk } from "../../../utils/requests";

export const fetchCartThunk = createAsyncThunk<
    FetchedCart,
    void,
    { state: { cart: CartSliceState } } //FIXME: should be changed to represent actual types of store state
>("cart/fetchCart", async (_: void, thunkApi): Promise<FetchedCart> => {
    let cartId = getCachedCartId();

    if (!cartId) {
        const userId = thunkApi.getState().cart.user;
        try {
            const resp = await getUserCart(userId);

            if (resp.status === 404) {
                const resp = await postUserCart(userId);

                const data = await resp.json();

                if (!isHttpStatusOk(resp)) {
                    throw new Error(
                        `Failed to create cart. Status code: ${resp.status}`
                    );
                }

                console.log(data);

                cartId = data.data.cartId;
                setCachedCartId(cartId!);
                console.log("CREATED CART FOR USER:", userId, cartId);
            } else if (!isHttpStatusOk(resp)) {
                throw new Error("Failed to get user cart ID.");
            } else {
                const data = await resp.json();
                cartId = data.data.cartId;
                setCachedCartId(cartId!);
                console.log("FOUND CART FOR USER:", userId, cartId);
            }
        } catch (error) {
            console.log(error);
            console.log("Falling back to: ", thunkApi.getState().cart);
            return thunkApi.getState().cart;
        }
    }

    try {
        const response = await getCartProducts(cartId!);

        if (!isHttpStatusOk(response)) {
            throw new Error("Failed to fetch products for cart " + cartId);
        }

        const data: CartProductResponse = await response.json();

        console.log("CART PRODUCTS:", data.data.products);

        const { products } = data.data;
        setCachedProductList(products);

        console.log({ cartId, products });
        return { cartId, products };
    } catch {
        return {
            cartId,
            products: getCachedCart() || {},
        };
    }
});

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
