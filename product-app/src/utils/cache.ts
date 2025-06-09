import { CartItem, CartItemMap } from "../types/cart";
import { Product, ProductId } from "../types/products";

const CART_CACHE_KEY = "cart";
const PRODUCT_LIST_CACHE_KEY = "products";
const CART_ID_CACHE_KEY = "cartId";

export function getCachedCart(): CartItemMap {
    const cached = localStorage.getItem(CART_CACHE_KEY);

    return cached ? JSON.parse(cached) : {};
}

export function setCachedCart(cartProducts: CartItemMap) {
    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cartProducts));
}

export function addCachedCartProduct(product: CartItem) {
    let cart = getCachedCart();

    cart[product.id] = product;

    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart));
}

export function removeCachedCartProduct(productId: ProductId) {
    let cart = getCachedCart();

    delete cart[productId];

    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart));
}

export function setCachedProductList(products: Product[]) {
    localStorage.setItem(PRODUCT_LIST_CACHE_KEY, JSON.stringify(products));
}

export function getCachedProductList(): Product[] {
    const cached = localStorage.getItem(PRODUCT_LIST_CACHE_KEY);

    return cached ? JSON.parse(cached) : [];
}

export function getCachedCartId(): string | null {
    const id = localStorage.getItem(CART_ID_CACHE_KEY);

    return id;
}

export function setCachedCartId(id: string) {
    localStorage.setItem(CART_ID_CACHE_KEY, id);
}
