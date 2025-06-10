import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeProductThunk } from "../../store/slices/cart/thunks";
import { CartItemMap, FormattedCartItemMap } from "../../types/cart";
import { formatCurrency } from "../../utils/currency";

export function useCart() {
    const products: CartItemMap = useAppSelector(
        (state) => state.cart.products
    );
    const formattedProducts: FormattedCartItemMap = useAppSelector((state) => {
        let products = state.cart.products;
        let map: FormattedCartItemMap = {};

        Object.entries(products).forEach(([key, item]) => {
            map[key] = { ...item, unitPrice: formatCurrency(item.unitPrice) };
        });

        return map;
    });
    const dispatch = useAppDispatch();

    const removeProduct = (key: string) => dispatch(removeProductThunk(key));

    return {
        cart: formattedProducts,
        removeProduct,
        total: formatCurrency(
            Object.values(products).reduce(
                (acc, item) => acc + item.unitPrice * item.amount,
                0
            )
        ),
    };
}
