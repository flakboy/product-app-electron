import { CartItemMap } from "../../../types/cart";

export type CartSliceState = {
    products: CartItemMap;
    //should have been placed in other slice or adjusted to some auth methods but it's not in the scope of the project
    user: string;
    cartId: string | null;
};

export type FetchedCart = Pick<CartSliceState, "products" | "cartId">;
