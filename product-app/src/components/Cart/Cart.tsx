import { Link } from "react-router";

import { FormattedCartItem } from "../../types/cart";

import s from "./Cart.module.css";
import { useCart } from "../../viewmodels/Cart/Cart";

export default function Cart() {
    const { cart, removeProduct, total } = useCart();

    return (
        <div>
            <h1> Cart </h1>

            <div className={s.cartList}>
                <h2> Selected products </h2>

                {Object.entries(cart).map(
                    ([key, item]: [string, FormattedCartItem]) => (
                        <div key={key} className={s.cartItem}>
                            <div>
                                <h3 className={s.cartItemLabel}>
                                    {" "}
                                    {item.name}
                                </h3>
                                <p>
                                    {item.amount} &#x2715;
                                    {item.unitPrice}
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
                                        removeProduct(key);
                                    }}
                                >
                                    Remove from cart
                                </button>
                            </div>
                        </div>
                    )
                )}
                <div>
                    <h3> Total </h3>
                    {total}
                </div>

                <button> Submit </button>
            </div>
        </div>
    );
}
