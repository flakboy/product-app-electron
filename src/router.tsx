import { createMemoryRouter } from "react-router";
import ProductList from "./components/ProductList/ProductList";
import App from "./App";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";

export const router = createMemoryRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/products",
                element: <ProductList />,
            },
            {
                path: "/products/:id",
                element: <ProductDetails />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
    },
]);
