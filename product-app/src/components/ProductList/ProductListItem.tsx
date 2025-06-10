import { Link } from "react-router";
import s from "./ProductListItem.module.css";
import { FormattedProduct } from "../../types/products";
type ProductListItemProps = {
    product: FormattedProduct;
};

export default function ProductListItem({ product }: ProductListItemProps) {
    return (
        <>
            <Link to={`/products/${product.id}`}>
                <div className={s.wrapper}>
                    <div>
                        <span>{product.name}</span>
                    </div>
                    <div>
                        <span>{product.unitPrice}</span>
                    </div>
                </div>
            </Link>
        </>
    );
}
