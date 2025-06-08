import { createSlice } from "@reduxjs/toolkit";
import { CartItemMap } from "../../../types/cart";
import { addProductThunk, fetchCartThunk, removeProductThunk } from "./thunks";

type CartSliceState = {
    products: CartItemMap;
};

const initialState: CartSliceState = {
    products: {},
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // removeProduct(state, action: PayloadAction<ProductId>) {},
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchCart.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            .addCase(fetchCartThunk.fulfilled, (state, action) => {
                state.products = action.payload;
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
