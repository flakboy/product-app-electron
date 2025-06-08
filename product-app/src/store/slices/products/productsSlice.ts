import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";
import { fetchProductListThunk } from "./thunks";

type ProductListStatus = "loading" | "success" | "failed";
type ProductSliceState = {
    products: Product[];
    status: ProductListStatus;
};

const initialState: ProductSliceState = {
    products: [],
    status: "success",
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductListThunk.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchProductListThunk.pending, (state, _action) => {
            state.status = "loading";
        });
    },
});

export default productsSlice.reducer;
