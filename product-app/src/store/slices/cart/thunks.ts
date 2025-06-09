import {
    addCachedCartProduct,
    getCachedCart,
    getCachedCartId,
    removeCachedCartProduct,
    setCachedCart,
    setCachedCartId,
} from "../../../utils/cache";

import { ProductId } from "../../../types/products";
import { CartItem } from "../../../types/cart";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProductToCart,
    CartProductResponse,
    deleteProductFromCart,
    getCartProducts,
    getUserCart,
    postUserCart,
} from "../../../utils/cart";
import { FetchedCart } from "./types";
import { isHttpStatusOk } from "../../../utils/requests";
import { RootState } from "../../store";

export const fetchCartThunk = createAsyncThunk<
    FetchedCart,
    void,
    { state: RootState }
>("cart/fetchCart", async (_: void, thunkApi): Promise<FetchedCart> => {
    let cartId;

    const userId = thunkApi.getState().cart.user;
    try {
        const resp = await getUserCart(userId);

        const data = await resp.json();

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
            cartId = data.data.cartId;
            setCachedCartId(cartId!);
            console.log("FOUND CART FOR USER:", userId, cartId);
        }
    } catch (error) {
        console.log(error);
        console.log("Falling back to: ", thunkApi.getState().cart);
        return { cartId: getCachedCartId(), products: getCachedCart() };
    }

    console.log("CARTID: ", cartId);

    try {
        console.log("FETCHING CART PRODUCTS FOR", cartId);
        const response = await getCartProducts(cartId!);

        if (!isHttpStatusOk(response)) {
            throw new Error("Failed to fetch products for cart " + cartId);
        }

        const data: CartProductResponse = await response.json();

        console.log("CART PRODUCTS:", data.data.products);

        const { products } = data.data;
        setCachedCart(products);

        console.log({ cartId, products });
        return { cartId, products };
    } catch {
        return {
            cartId,
            products: getCachedCart() || {},
        };
    }
});

export const addProductThunk = createAsyncThunk<
    CartItem,
    CartItem,
    { state: RootState }
>("cart/addProduct", async (payload: CartItem, thunkApi): Promise<CartItem> => {
    const cartId = thunkApi.getState().cart.cartId;

    if (cartId) {
        const resp = await addProductToCart(cartId, payload);

        console.log(resp.json());
        if (isHttpStatusOk(resp)) {
            addCachedCartProduct(payload);
        }
    }

    return payload;
});

export const removeProductThunk = createAsyncThunk<
    ProductId,
    ProductId,
    { state: RootState }
>(
    "cart/removeProduct",
    async (payload: ProductId, thunkApi): Promise<ProductId> => {
        const cartId = thunkApi.getState().cart.cartId;

        if (cartId) {
            console.log("USUWAM: ", cartId, payload);
            const resp = await deleteProductFromCart(cartId, payload);

            console.log(resp.json());
            if (isHttpStatusOk(resp)) {
                removeCachedCartProduct(payload);
            }
        }

        return payload;
    }
);
