import { createSlice } from "@reduxjs/toolkit";
import { addProductThunk, fetchCartThunk, removeProductThunk } from "./thunks";
import { CartSliceState } from "./types";

const initialState: CartSliceState = {
    products: {},
    user: "johndoe",
    cartId: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // removeProduct(state, action: PayloadAction<ProductId>) {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartThunk.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.cartId = action.payload.cartId;
            })
            .addCase(addProductThunk.fulfilled, (state, action) => {
                state.products = {
                    ...state.products,
                    [action.payload.id]: action.payload,
                };
            })
            .addCase(removeProductThunk.fulfilled, (state, action) => {
                const products = { ...state.products };
                delete products[action.payload];

                state.products = products;
            });
    },
});

// export const { removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
