import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/products";

const initialState: Product[] = [];

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (_builder) => {},
});
