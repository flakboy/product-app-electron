import { Link } from "react-router";
import { Product } from "../../types/products";
import s from "./ProductListItem.module.css";
import { formatCurrency } from "../../utils/currency";
type ProductListItemProps = {
    product: Product;
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
                        <span>{formatCurrency(product.unitPrice)}</span>
                    </div>
                </div>
            </Link>
        </>
    );
}
