import { Link, useParams } from "react-router";
import { useProductDetails } from "../../viewmodels/ProductDetails/ProductDetails";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProduct } from "../../store/cartslice";
import { useState } from "react";
import s from "./ProductDetails.module.css";
import { formatCurrency } from "../../utils/currency";

function MissingIdView() {
    return (
        <div>
            <h2> Erorr: missing parameter: id</h2>
        </div>
    );
}

export default function ProductDetails() {
    const { id } = useParams();
    if (!id) {
        return <MissingIdView />;
    }

    const details = useProductDetails(id);
    const products = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();

    const [count, setCount] = useState(1);

    return (
        <div>
            <Link to="/products">Back</Link>
            {details ? (
                <>
                    <h1>{details?.name}</h1>
                    <div>
                        <div className={s.buyWrapper}>
                            <span className={s.buyPrice}>
                                {formatCurrency(details.price)}$
                            </span>

                            <span> {details.amount} units left. </span>
                            <div className={s.buyButtonWrapper}>
                                <input
                                    className={s.buyInput}
                                    type="number"
                                    min={1}
                                    max={10}
                                    step={1}
                                    defaultValue={count}
                                    onChange={(e) =>
                                        setCount(parseInt(e.target.value))
                                    }
                                />
                                <button
                                    className={s.buyButton}
                                    disabled={
                                        details.amount <= 0 || id in products
                                    }
                                    onClick={() => {
                                        dispatch(
                                            addProduct({
                                                ...details,
                                                amount: count,
                                            })
                                        );
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <h3> Description </h3>
                    <p> {details?.description}</p>
                </>
            ) : (
                <p> Couldn't find information about product with ID {id}.</p>
            )}
        </div>
    );
}
