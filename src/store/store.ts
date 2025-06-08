import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart/cartSlice";
import productsList from "./slices/products/productsSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsList,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
