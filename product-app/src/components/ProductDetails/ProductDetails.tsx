import { Link, useParams } from "react-router";
import { useProductDetails } from "../../viewmodels/ProductDetails/ProductDetails";

import { useState } from "react";
import s from "./ProductDetails.module.css";

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

    const { details, error, isInCart, addToCart } = useProductDetails(id);

    const [count, setCount] = useState(1);

    return (
        <div>
            {error ? <p>{error}</p> : null}
            <Link to="/products">Back</Link>
            {!error && details ? (
                <>
                    <h1>{details?.name}</h1>
                    <div>
                        <div className={s.buyWrapper}>
                            <span className={s.buyPrice}>
                                {details.unitPrice}$
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
                                    disabled={details.amount <= 0 || isInCart}
                                    onClick={() => {
                                        addToCart(details, count);
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
