import { GATEWAY_URL } from "../consts/api";
import { CartItem, CartItemMap } from "../types/cart";

export type CartProductResponse = {
    status: "sucess";
    data: {
        products: CartItemMap;
    };
};

export function getUserCart(userId: string) {
    return fetch(`${GATEWAY_URL}/carts/user/${userId}`, {
        method: "GET",
    });
}

export function postUserCart(userId: string) {
    return fetch(`${GATEWAY_URL}/carts`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({
            userId,
        }),
    });
}

export function getCartProducts(cartId: string): Promise<Response> {
    return fetch(`${GATEWAY_URL}/carts/${cartId}`);
}

export function addProductToCart(cartId: string, cartItem: CartItem) {
    const { unitPrice: price, amount, id } = cartItem;
    return fetch(`${GATEWAY_URL}/carts/${cartId}/products`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ price, amount, id }),
    });
}

export function deleteProductFromCart(cartId: string, productId: string) {
    return fetch(`${GATEWAY_URL}/carts/${cartId}/products`, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({ productId }),
    });
}
