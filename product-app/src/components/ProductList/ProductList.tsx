import useProductList from "../../viewmodels/ProductList/ProductList";
import ProductListItem from "./ProductListItem";
import s from "./ProductList.module.css";

export default function ProductList() {
    const { status, products } = useProductList();

    return (
        <div className={s.list}>
            <h1> Products </h1>
            {status === "loading" ? <p>Loading...</p> : null}
            {products.map((item) => (
                <ProductListItem key={item.id} product={item} />
            ))}
        </div>
    );
}
