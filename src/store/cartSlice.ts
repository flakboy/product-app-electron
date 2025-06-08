import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartItemMap } from "../types/cart";
import { ProductId } from "../types/products";

const initialState: {
    products: CartItemMap;
} = {
    products: {
        "12312312": {
            name: "IPhone 12",
            id: "12312312",
            amount: 2,
            price: 100000,
        },
        "12312311": {
            name: "Lenovo Thinkpad 212321",
            id: "12312311",
            amount: 2,
            price: 100000,
        },
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CartItem>) {
            console.log(action);

            state.products = {
                ...state.products,
                [action.payload.id]: action.payload,
            };

            console.log(state.products);
        },
        removeProduct(state, action: PayloadAction<ProductId>) {
            const products = { ...state.products };
            delete products[action.payload];

            state.products = products;
        },
    },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
