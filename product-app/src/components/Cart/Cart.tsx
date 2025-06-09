import { Link } from "react-router";

import { useAppDispatch } from "../../store/hooks";
import { removeProductThunk } from "../../store/slices/cart/thunks";

import { CartItem, CartItemMap } from "../../types/cart";

import s from "./Cart.module.css";
import { formatCurrency } from "../../utils/currency";
import { useCart } from "../../viewmodels/Cart/Cart";

export default function Cart() {
    const cart: CartItemMap = useCart();
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1> Cart </h1>

            <div className={s.cartList}>
                <h2> Selected products </h2>

                {Object.entries(cart).map(([key, item]: [string, CartItem]) => (
                    <div key={key} className={s.cartItem}>
                        <div>
                            <h3 className={s.cartItemLabel}> {item.name}</h3>
                            <p>
                                {item.amount} &#x2715;
                                {formatCurrency(item.unitPrice)}
                            </p>
                            <span>
                                <Link to={`/products/${key}`}>
                                    Details &gt;
                                </Link>
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    dispatch(removeProductThunk(key));
                                }}
                            >
                                Remove from cart
                            </button>
                        </div>
                    </div>
                ))}
                <div>
                    <h3> Total </h3>
                    {formatCurrency(
                        Object.values(cart).reduce(
                            (acc, item) => acc + item.unitPrice * item.amount,
                            0
                        )
                    )}
                </div>

                <button> Submit </button>
            </div>
        </div>
    );
}
