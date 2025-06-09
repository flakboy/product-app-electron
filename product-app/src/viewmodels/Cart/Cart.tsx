import { useAppSelector } from "../../store/hooks";
import { CartItemMap } from "../../types/cart";

export function useCart() {
    const cart: CartItemMap = useAppSelector((state) => state.cart.products);

    return cart;
}
