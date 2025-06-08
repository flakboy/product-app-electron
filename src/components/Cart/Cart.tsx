import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CartItem, CartItemMap } from "../../types/cart";

import { removeProduct } from "../../store/cartslice";

import s from "./Cart.module.css";
import { formatCurrency } from "../../utils/currency";
import { Link } from "react-router";

export default function Cart() {
    const cart: CartItemMap = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1> Cart </h1>

            <div className={s.cartList}>
                <h2> Selected products </h2>

                {Object.values(cart).map((item: CartItem) => (
                    <div key={item.id} className={s.cartItem}>
                        <div>
                            <h3 className={s.cartItemLabel}> {item.name}</h3>
                            <p>
                                {item.amount} &#x2715;
                                {formatCurrency(item.price)}
                            </p>
                            <span>
                                {" "}
                                <Link to={`/products/${item.id}`}>
                                    {" "}
                                    Details &gt;{" "}
                                </Link>
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    dispatch(removeProduct(item.id));
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
                            (acc, item) => acc + item.price * item.amount,
                            0
                        )
                    )}
                </div>

                <button> Submit </button>
            </div>
        </div>
    );
}
