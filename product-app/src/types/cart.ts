import { Product } from "./products";

export type CartItem = Pick<Product, "name" | "id" | "unitPrice"> & {
    amount: number;
};

export type CartItemMap = {
    [key: string]: CartItem;
};

export type FormattedCartItem = Omit<CartItem, "unitPrice"> & {
    unitPrice: string;
};

export type FormattedCartItemMap = {
    [key: string]: FormattedCartItem;
};
